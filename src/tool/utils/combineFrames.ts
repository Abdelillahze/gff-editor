import Jimp from "jimp";
import { ILayoutEdited } from "../ts/interfaces/app_interfaces";

export default async function combineFrames(
  bluredFrame: Jimp,
  layouts: ILayoutEdited[]
) {
  const bluredImage = await Jimp.read(bluredFrame);

  await Promise.all(
    layouts.map(async (layout) => {
      const image = await Jimp.read(layout.image);
      bluredImage.composite(image, layout.frame.x, layout.frame.y);
    })
  );

  return bluredImage;
}
