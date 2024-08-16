import { createCanvas, registerFont } from "canvas";
import wrapText from "./wrapText";
import { writeFile } from "fs-extra";
import { drawRoundedRect } from "./drawRoundedRect";
import { ICaption } from "../ts/interfaces/app_interfaces";

export default async function createText(options: ICaption) {
  const { text, x, y, fontSize, padding, borderRadius, style } = options;
  const canvas = createCanvas(1080, 1920);
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  registerFont("./src/tool/fonts/inter.ttf", { family: "Inter" });
  ctx.font = `bold ${fontSize}px Inter`;
  ctx.textBaseline = "top";
  ctx.textAlign = "start";
  const lines = wrapText(ctx, text);
  lines.map((line, i) => {
    const size = ctx.measureText(line);
    console.log(line);
    if (size.width > width) {
      width += size.width;
    }
    height += size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
  });
  console.log(width, height);
  switch (style) {
    case "blackWhite": {
      ctx.fillStyle = "#000000";
      break;
    }
    case "whiteBlack": {
      ctx.fillStyle = "#ffffff";
      break;
    }
  }
  drawRoundedRect(
    ctx,
    x - padding[0] / 2,
    y - padding[1] / 3,
    width + padding[0],
    height + padding[1] + (lines.length - 1) * 15,
    borderRadius
  );
  ctx.fill();
  switch (style) {
    case "blackWhite": {
      ctx.fillStyle = "#ffffff";
      break;
    }
    case "whiteBlack": {
      ctx.fillStyle = "#000000";
      break;
    }
  }
  lines.map((line, i) => {
    ctx.fillText(line, x, y + i * 60);
  });

  // const buffer = Buffer.from(
  //   canvas.toDataURL().replace(/^data:image\/\w+;base64,/, ""),
  //   "base64"
  // );
  // writeFile("output.png", buffer);

  return canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
}
