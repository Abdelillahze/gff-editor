import Jimp from "jimp";
import { ILayout } from "../ts/interfaces/app_interfaces";
import resizeFrames from "../helpers/resizeFrames";

export default async function getLayout(frame: Jimp, options: ILayout) {
  const { x, y, width, height, ParentHeight, ParentWidth } = options.crop;
  const { width: mWidth, height: mHeight } = options.frame;
  const image = await Jimp.read(frame);
  const orWidth = image.getWidth();
  const orHeight = image.getHeight();
  const ratioedWidth = (orWidth * width) / ParentWidth;
  const ratioedHeight = (orHeight * height) / ParentHeight;
  const ratioedX = (orWidth * x) / ParentWidth;
  const ratioedY = (orHeight * y) / ParentHeight;

  let croppedImage = image.crop(
    ratioedX,
    ratioedY,
    ratioedWidth,
    ratioedHeight
  );

  await croppedImage.writeAsync("%d.png");
  let result = await resizeFrames(
    croppedImage,
    ratioedWidth,
    ratioedHeight,
    mWidth,
    mHeight
  );

  return {
    label: options.label,
    frame: options.frame,
    image: result,
  };
}

export type { ILayout };
