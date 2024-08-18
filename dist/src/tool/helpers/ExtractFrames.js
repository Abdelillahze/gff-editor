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
const stream_1 = require("stream");
const blurFrame_1 = __importDefault(require("../utils/blurFrame"));
const combineFrames_1 = __importDefault(require("../utils/combineFrames"));
const getLayout_1 = __importDefault(require("../utils/getLayout"));
const addCaptions_1 = __importDefault(require("../utils/addCaptions"));
let frameCount = 1;
class ExtractFrames extends stream_1.Transform {
    constructor(delimiter, options) {
        super({ readableObjectMode: true });
        this.delimiter = Buffer.from(delimiter, "hex");
        this.buffer = Buffer.alloc(0);
        this.options = options;
    }
    _transform(data, enc, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("starting");
            this.buffer = Buffer.concat([this.buffer, data]);
            while (true) {
                const start = this.buffer.indexOf(this.delimiter);
                if (start < 0) {
                    console.log("no frame data at all");
                    break;
                }
                const end = this.buffer.indexOf(this.delimiter, start + this.delimiter.length);
                if (end < 0) {
                    console.log("we haven't got the whole frame yet");
                    break;
                }
                const frame = yield jimp_1.default.read(this.buffer);
                const layouts = yield Promise.all(this.options.layouts.map((layout) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, getLayout_1.default)(frame, layout, this.options.resolution);
                })));
                const contentLayout = layouts.find((layout) => layout.label === "content");
                const bluredFrame = yield (0, blurFrame_1.default)(contentLayout.image, this.options.resolution, this.options.blurredBackground);
                const combinedFrames = yield (0, combineFrames_1.default)(bluredFrame, layouts);
                const resultFrame = yield (0, addCaptions_1.default)(combinedFrames, frameCount, this.options.captions);
                resultFrame.getBuffer(jimp_1.default.MIME_JPEG, (err, buffer) => {
                    if (err)
                        return console.log("err" + err);
                    this.push(buffer);
                });
                resultFrame.writeAsync(`result.png`);
                frameCount++;
                this.buffer = this.buffer.slice(end);
                if (start > 0)
                    console.error(`Discarded ${start} bytes of invalid data`);
            }
            cb();
        });
    }
}
exports.default = ExtractFrames;
