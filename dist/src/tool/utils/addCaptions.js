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
const createText_1 = __importDefault(require("../helpers/createText"));
function addCaptions(frame, frameCount, captions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!captions)
            return frame;
        for (let caption of captions) {
            console.log(!(caption.start <= frameCount && caption.end >= frameCount), caption, frameCount);
            if (!(caption.start <= frameCount && caption.end >= frameCount))
                break;
            console.log("slm");
            const textImage = yield jimp_1.default.read(Buffer.from(yield (0, createText_1.default)(caption), "base64"));
            frame.composite(textImage, 0, 0);
        }
        return frame;
    });
}
exports.default = addCaptions;
