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
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ExtractFrames_1 = __importDefault(require("../helpers/ExtractFrames"));
const child_process_1 = require("child_process");
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
function createVideo(input, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const debug = true;
        let readable = false;
        try {
            const transform = new ExtractFrames_1.default("FFD8FF", options);
            const encodingProcess = (0, child_process_1.spawn)("ffmpeg", [
                "-i",
                input,
                "-f",
                "image2pipe",
                "-vcodec",
                "mjpeg",
                "-i",
                "-",
                "-y",
                "-acodec",
                "aac",
                "-filter:v",
                "setpts=0.825*PTS",
                "-map",
                "1:v:0",
                "-map",
                "0:a:0",
                "-pix_fmt",
                "yuv420p",
                "-r",
                "30",
                "-vcodec",
                "h264",
                "output.mp4",
            ]);
            const inputOptionsArray = [];
            if (options.start) {
                inputOptionsArray.push("-ss", `${options.start}s`);
            }
            if (options.end) {
                inputOptionsArray.push("-to", `${options.end}s`);
            }
            (0, fluent_ffmpeg_1.default)()
                .addInput(input)
                .inputOptions(inputOptionsArray)
                .outputOptions(["-q:v 2", "-vcodec mjpeg", "-f image2pipe", "-r 30"])
                .on("error", (err) => {
                console.log(err);
            })
                .pipe(transform)
                .pipe(encodingProcess.stdin)
                .on("finish", () => {
                encodingProcess.stdin.end();
                console.log("finisheihdiheid");
            });
            encodingProcess.stderr.on("data", function (data) {
                console.log("stdout: " + data);
            });
            encodingProcess.on("error", (err) => {
                console.log(err);
            });
            encodingProcess.stdout.on("data", (chunk) => {
                console.log("chunkkkkkkkkkk");
                console.log(chunk);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.default = createVideo;
