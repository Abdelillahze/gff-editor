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
const resizeFrames_1 = __importDefault(require("../helpers/resizeFrames"));
function getLayout(frame, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { x, y, width, height, ParentHeight, ParentWidth } = options.crop;
        const { width: mWidth, height: mHeight } = options.frame;
        const image = yield jimp_1.default.read(frame);
        const orWidth = image.getWidth();
        const orHeight = image.getHeight();
        const ratioedWidth = (orWidth * width) / ParentWidth;
        const ratioedHeight = (orHeight * height) / ParentHeight;
        const ratioedX = (orWidth * x) / ParentWidth;
        const ratioedY = (orHeight * y) / ParentHeight;
        let croppedImage = image.crop(ratioedX, ratioedY, ratioedWidth, ratioedHeight);
        yield croppedImage.writeAsync("%d.png");
        let result = yield (0, resizeFrames_1.default)(croppedImage, ratioedWidth, ratioedHeight, mWidth, mHeight);
        return {
            label: options.label,
            frame: options.frame,
            image: result,
        };
    });
}
exports.default = getLayout;
