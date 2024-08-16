// import ffmpegPath from "ffmpeg-static";
// import ffmpeg from "fluent-ffmpeg";

// ffmpeg.setFfmpegPath(ffmpegPath as string);

// export default async function trimAndUploadVideo(
//   url: string,
//   start: number,
//   end: number
// ) {
//   return new Promise((resolve, reject) => {
//     ffmpeg.ffprobe(url, (err, metaData) => {
//       ffmpeg()
//         .input(url)
//         .inputOption([
//           `-ss ${Math.floor(start * 1000)}ms`,
//           `-to ${Math.floor(end * 1000)}ms`,
//         ])
//         .videoCodec("libx264")
//         .audioCodec("aac")
//         .outputFormat("mp4")
//         .outputOptions(["-movflags frag_keyframe+empty_moov"])
//         .output(
//           cloudinary.uploader.upload_stream(
//             {
//               folder: "gff clip",
//               resource_type: "video",
//             },
//             (error: any, result: any) => {
//               console.log(result, "NOW FR FRRRRRRRRRRRRRR");
//               resolve(result.secure_url);
//               if (error) {
//                 console.log(error);
//                 reject(error);
//               }
//             }
//           ),
//           { end: true }
//         )
//         .on("end", () => {
//           console.log("finished fr");
//         })
//         .on("error", (err) => {
//           console.log(err);
//         })
//         .run();
//     });
//   });
// }
