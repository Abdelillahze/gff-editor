"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
function getFfmpegTransform() {
    const input = new stream_1.PassThrough();
    const output = new stream_1.PassThrough();
    (0, fluent_ffmpeg_1.default)(input)
        .inputFormat("mp4")
        .format("mp4")
        .outputOptions(["-movflags frag_keyframe+empty_moov", "-pix_fmt yuv420p"])
        .on("end", () => {
        console.log("FINISHSIEHD");
    })
        .on("error", (err) => {
        console.log(err);
    })
        .on("progress", () => {
        console.log("progressed");
    })
        .pipe(output);
    return stream_1.Duplex.from({
        writable: input,
        readable: output,
    });
}
exports.default = getFfmpegTransform;
