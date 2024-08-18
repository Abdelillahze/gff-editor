import Jimp from "jimp";

interface ILayout {
  label: string;
  frame: {
    ParentWidth: number;
    ParentHeight: number;
    width: number;
    height: number;
    x: number;
    y: number;
  };
  crop: {
    ParentWidth: number;
    ParentHeight: number;
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

interface ILayoutEdited {
  label: string;
  frame: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  image: Buffer;
}

interface ICaption {
  text: string;
  start: number;
  end: number;
  x: number;
  y: number;
  fontSize: number;
  padding: number[];
  borderRadius: number;
  style: "blackWhite" | "whiteBlack";
}

interface IOptions {
  blurredBackground: boolean;
  watermark: boolean;
  outro: boolean;
  resolution: number;
  layouts: ILayout[];
  captions: ICaption[];
  start?: number;
  end?: number;
}

export type { IOptions, ILayout, ILayoutEdited, ICaption };
