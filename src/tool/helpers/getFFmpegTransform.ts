import { PassThrough, Duplex } from "stream";
import ffmpeg from "fluent-ffmpeg";

// Returns a Duplex stream whose input and output are connected (basically a Transform)
//
export default function getFfmpegTransform() {
  const input = new PassThrough();
  const output = new PassThrough();
  ffmpeg(input)
    // Stream input requires manually specifying input format
    .inputFormat("mp4")
    // Stream output requires manually specifying output format
    .format("mp4")
    // Stream output requires fragmented output
    // https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/346#issuecomment-67299526
    .outputOptions(["-movflags frag_keyframe+empty_moov", "-pix_fmt yuv420p"])
    .on("end", () => {
      console.log("FINISHSIEHD");
    })
    .on("error", (err) => {
      console.log(err);
    })
    .on("progress", () => {
      console.log("progressed");
    })
    .pipe(output);

  return Duplex.from({
    // previous stream writes to input
    writable: input,
    // next stream reads from output
    readable: output,
  });
}
