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
function blurFrame(frame, resolution, blurFrame) {
    return __awaiter(this, void 0, void 0, function* () {
        if (blurFrame === false) {
            const blackImage = new jimp_1.default(resolution, (resolution * 16) / 9, "#000000");
            return blackImage;
        }
        const image = yield jimp_1.default.read(frame);
        const { width: fWidth, height: fHeight } = image.bitmap;
        const resizedImage = yield (0, resizeFrames_1.default)(image, fWidth, fHeight, resolution, (resolution * 16) / 9);
        return resizedImage.blur(30);
    });
}
exports.default = blurFrame;
