import Jimp from "jimp";
import { Transform } from "stream";
import { IOptions } from "../ts/interfaces/app_interfaces";
import blurFrame from "../utils/blurFrame";
import combineFrames from "../utils/combineFrames";
import getLayout from "../utils/getLayout";
import addCaptions from "../utils/addCaptions";
let frameCount = 1;

class ExtractFrames extends Transform {
  delimiter: any;
  buffer: any;
  options: IOptions;
  constructor(delimiter: any, options: IOptions) {
    super({ readableObjectMode: true });
    this.delimiter = Buffer.from(delimiter, "hex");
    this.buffer = Buffer.alloc(0);
    this.options = options;
  }

  async _transform(data: any, enc: any, cb: any) {
    // Add new data to buffer
    console.log("starting");
    this.buffer = Buffer.concat([this.buffer, data]);
    while (true) {
      const start = this.buffer.indexOf(this.delimiter);
      if (start < 0) {
        // there's no frame data at all
        console.log("no frame data at all");
        break;
      }
      const end = this.buffer.indexOf(
        this.delimiter,
        start + this.delimiter.length
      );
      //   console.log(end, "end");
      if (end < 0) {
        // we haven't got the whole frame yet
        console.log("we haven't got the whole frame yet");
        break;
      }
      //   console.log(this.buffer);
      const frame = await Jimp.read(this.buffer);

      const layouts = await Promise.all(
        this.options.layouts.map(async (layout) => {
          return await getLayout(frame, layout);
        })
      );
      const contentLayout = layouts.find(
        (layout) => layout.label === "content"
      )!;
      const bluredFrame = await blurFrame(
        contentLayout.image,
        this.options.resolution,
        this.options.blurredBackground
      );
      const combinedFrames = await combineFrames(bluredFrame, layouts);

      const resultFrame = await addCaptions(
        combinedFrames,
        frameCount,
        this.options.captions
      );

      resultFrame.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
        if (err) return console.log("err" + err);
        this.push(buffer); // emit a frame
      });

      resultFrame.writeAsync(`result.png`);
      frameCount++;

      this.buffer = this.buffer.slice(end); // remove frame data from buffer
      if (start > 0) console.error(`Discarded ${start} bytes of invalid data`);
    }
    cb();
  }
}

export default ExtractFrames;
