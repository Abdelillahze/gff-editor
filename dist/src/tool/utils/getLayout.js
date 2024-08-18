"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const canvas_1 = require("canvas");
function getLayout(frame, options, resolution) {
    return __awaiter(this, void 0, void 0, function* () {
        const { x: cropX, y: cropY, width: cropWidth, height: cropHeight, ParentHeight, ParentWidth, } = options.crop;
        const resultWidth = resolution;
        const resultHeight = resolution * (16 / 9);
        const frameCoordinate = options.frame;
        const image = yield jimp_1.default.read(frame);
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
        const canvasWidth = (resultWidth * frameCoordinate.width) / frameCoordinate.ParentWidth;
        const canvasHeight = (resultHeight * frameCoordinate.height) / frameCoordinate.ParentHeight;
        const canvas = (0, canvas_1.createCanvas)(canvasWidth, canvasHeight);
        const ctx = canvas.getContext("2d");
        if (canvas.width > frameWidth) {
            console.log("width");
            frameWidth = canvas.width;
            frameHeight = canvas.width / aspectRatio;
            if (canvas.height > frameHeight) {
                frameWidth = canvas.height * aspectRatio;
                frameHeight = canvas.height;
            }
        }
        else if (canvas.height > frameHeight) {
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
        const loadedImage = yield (0, canvas_1.loadImage)(yield image.getBase64Async(jimp_1.default.MIME_PNG));
        ctx.drawImage(loadedImage, x, y, width, height, -offsetX, -offsetY, frameWidth, frameHeight);
        return {
            label: options.label,
            frame: options.frame,
            image: canvas.toBuffer("image/png"),
        };
    });
}
exports.default = getLayout;
