import Jimp from "jimp";
import { ILayout } from "./getLayout";

export default async function cropFrame(frame: Jimp, options: ILayout) {
  const image = await Jimp.read(frame);
  const { x, y, width, height } = options.crop;

  return image.crop(x, y, width, height);
}
