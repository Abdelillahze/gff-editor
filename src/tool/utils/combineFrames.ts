import Jimp from "jimp";
import { ILayoutEdited } from "../ts/interfaces/app_interfaces";

export default async function combineFrames(
  bluredFrame: Jimp,
  layouts: ILayoutEdited[]
) {
  const bluredImage = await Jimp.read(bluredFrame);

  layouts.map((layout) => {
    bluredImage.composite(layout.image, layout.frame.x, layout.frame.y);
  });

  return bluredImage;
}
