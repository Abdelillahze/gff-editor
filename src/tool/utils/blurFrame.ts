import Jimp from "jimp";
import resizeFrames from "../helpers/resizeFrames";

export default async function blurFrame(
  frame: Jimp,
  resolution: number,
  blurFrame: boolean
) {
  // if blurFrame option is false
  if (blurFrame === false) {
    const blackImage = new Jimp(resolution, (resolution * 16) / 9, "#000000");

    return blackImage;
  }

  // if blurFrame options is true
  const image = await Jimp.read(frame);

  const { width: fWidth, height: fHeight } = image.bitmap;
  const resizedImage = await resizeFrames(
    image,
    fWidth,
    fHeight,
    resolution,
    (resolution * 16) / 9
  );

  return resizedImage.blur(30);
}
