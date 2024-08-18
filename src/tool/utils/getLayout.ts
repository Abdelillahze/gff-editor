import Jimp from "jimp";
import { ILayout } from "../ts/interfaces/app_interfaces";
import resizeFrames from "../helpers/resizeFrames";
import { createCanvas, loadImage } from "canvas";

export default async function getLayout(
  frame: Jimp,
  options: ILayout,
  resolution: number
) {
  const {
    x: cropX,
    y: cropY,
    width: cropWidth,
    height: cropHeight,
    ParentHeight,
    ParentWidth,
  } = options.crop;
  const resultWidth = resolution;
  const resultHeight = resolution * (16 / 9);
  const frameCoordinate = options.frame;
  const image = await Jimp.read(frame);

  const originalWidth = image.getWidth();
  const originalHeight = image.getHeight();
  const width = (originalWidth * cropWidth) / ParentWidth;
  const height = (originalHeight * cropHeight) / ParentHeight;
  const x = (originalWidth * cropX) / ParentWidth;
  const y = (originalHeight * cropY) / ParentHeight;
  let frameWidth = cropWidth;
  let frameHeight = cropHeight;
  let offsetX = 0;
  let offsetY = 0;
  const aspectRatio = cropWidth / cropHeight;

  console.log(resultWidth, resultHeight);
  const canvasWidth =
    (resultWidth * frameCoordinate.width) / frameCoordinate.ParentWidth;
  const canvasHeight =
    (resultHeight * frameCoordinate.height) / frameCoordinate.ParentHeight;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  if (canvas.width > frameWidth) {
    console.log("width");
    frameWidth = canvas.width;
    frameHeight = canvas.width / aspectRatio;
    if (canvas.height > frameHeight) {
      frameWidth = canvas.height * aspectRatio;
      frameHeight = canvas.height;
    }
  } else if (canvas.height > frameHeight) {
    console.log("height");
    frameWidth = canvas.height * aspectRatio;
    frameHeight = canvas.height;
  }

  console.log(frameWidth, canvas.width, "##################");

  if (frameWidth > canvas.width) {
    console.log("bro?");
    offsetX = (frameWidth - canvas.width) / 2;
  }
  if (frameHeight > canvas.height) {
    console.log("sup");
    offsetY = (frameHeight - canvas.height) / 2;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const loadedImage = await loadImage(
    await image.getBase64Async(Jimp.MIME_PNG)
  );
  ctx.drawImage(
    loadedImage,
    x,
    y,
    width,
    height,
    -offsetX,
    -offsetY,
    frameWidth,
    frameHeight
  );

  return {
    label: options.label,
    frame: options.frame,
    image: canvas.toBuffer("image/png"),
  };
}

export type { ILayout };
