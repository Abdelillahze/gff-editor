import Jimp from "jimp";
import { ICaption } from "../ts/interfaces/app_interfaces";
import createText from "../helpers/createText";

export default async function addCaptions(
  frame: Jimp,
  frameCount: number,
  captions: ICaption[]
) {
  if (!captions) return frame;
  for (let caption of captions) {
    console.log(
      !(caption.start <= frameCount && caption.end >= frameCount),
      caption,
      frameCount
    );
    if (!(caption.start <= frameCount && caption.end >= frameCount)) break;

    console.log("slm");
    const textImage = await Jimp.read(
      Buffer.from(await createText(caption), "base64")
    );

    frame.composite(textImage, 0, 0);
  }

  return frame;
}
