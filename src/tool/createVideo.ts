import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { IOptions } from "./ts/interfaces/app_interfaces";
import ExtractFrames from "./helpers/ExtractFrames";
import { spawn } from "child_process";
import cloudinary from "../lib/cloudinary";
import { createWriteStream } from "fs-extra";
import convertSeconds from "./utils/convertSeconds";

ffmpeg.setFfmpegPath(ffmpegPath as string);

export default async function createVideo(input: string, options: IOptions) {
  try {
    const transform = new ExtractFrames("FFD8FF", options);

    const inputOptionsArray = [];

    if (options.start) {
      inputOptionsArray.push("-ss", `${options.start.toFixed(2)}`);
    }
    if (options.end) {
      inputOptionsArray.push("-to", `${convertSeconds(options.end)}`);
    }

    const encodingProcess = spawn("ffmpeg", [
      ...inputOptionsArray,
      "-i",
      input,
      "-f",
      "image2pipe",
      "-vcodec",
      "mjpeg",
      "-i",
      "-",
      "-y",
      "-acodec",
      "aac",
      "-filter:v",
      "setpts=0.825*PTS",
      "-map",
      "1:v:0",
      "-map",
      "0:a:0",
      "-pix_fmt",
      "yuv420p",
      "-r",
      "30",
      "-preset",
      "veryslow",
      "-vcodec",
      "h264",
      // @ts-ignore
      `./outputs/${new Date()
        .toLocaleString("en-GB")
        .replace(/\/|:|,/g, ".")}.mp4`,
    ]);

    ffmpeg()
      .addInput(input)
      .inputOptions(inputOptionsArray)
      .renice(0.1)
      .outputOptions([
        "-q:v 2",
        "-vcodec mjpeg",
        "-f image2pipe",
        "-r 30",
        "-preset veryslow",
      ])
      .on("error", (err) => {
        console.log(err);
      })
      .pipe(transform)
      .pipe(encodingProcess.stdin)
      .on("finish", () => {
        encodingProcess.stdin.end();
        console.log("finisheihdiheid");
      });

    encodingProcess.stderr.on("data", function (data) {
      console.log("stdout: " + data);
    });

    encodingProcess.on("error", (err) => {
      console.log(err);
    });

    // encodingProcess.stdout.pipe(
    //   // cloudinary.uploader.upload_stream(
    //   //   {
    //   //     folder: "gff clip",
    //   //     resource_type: "video",
    //   //   },
    //   //   (error: any, result: any) => {
    //   //     console.log(result, "NOW FR FRRRRRRRRRRRRRR");
    //   //     if (error) {
    //   //       console.log(error);
    //   //     }
    //   //   }
    //   // )
    //   // createWriteStream(`./outputs/${input}`)
    // );

    encodingProcess.stdout.on("data", (chunk) => {
      console.log("chunkkkkkkkkkk");
      console.log(chunk);
    });
  } catch (err) {
    console.log(err);
  }
}
