import Jimp from "jimp";

export default async function resizeFrames(
  frame: Jimp,
  width: number,
  height: number,
  minWidth: number,
  minHeight: number
) {
  const image = await Jimp.read(frame);
  const ratio = width / height;
  let newWidth, newHeight;

  if (width > height) {
    newWidth = Math.max(minWidth, width);
    newHeight = Math.floor(newWidth / ratio);

    if (newHeight < minHeight) {
      newHeight = minHeight;
      newWidth = newHeight * ratio;
    }
  } else {
    newHeight = Math.max(minHeight, height);
    newWidth = Math.floor(newHeight * ratio);

    if (newWidth < minWidth) {
      newWidth = minWidth;
      newHeight = newWidth / ratio;
    }
  }

  return image.resize(newWidth, newHeight).crop(0, 0, minWidth, minHeight);
}
