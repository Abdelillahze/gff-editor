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
function resizeFrames(frame, width, height, minWidth, minHeight) {
    return __awaiter(this, void 0, void 0, function* () {
        const image = yield jimp_1.default.read(frame);
        const ratio = width / height;
        let newWidth, newHeight;
        if (width > height) {
            newWidth = Math.max(minWidth, width);
            newHeight = Math.floor(newWidth / ratio);
            if (newHeight < minHeight) {
                newHeight = minHeight;
                newWidth = newHeight * ratio;
            }
        }
        else {
            newHeight = Math.max(minHeight, height);
            newWidth = Math.floor(newHeight * ratio);
            if (newWidth < minWidth) {
                newWidth = minWidth;
                newHeight = newWidth / ratio;
            }
        }
        return image.resize(newWidth, newHeight).crop(0, 0, minWidth, minHeight);
    });
}
exports.default = resizeFrames;
