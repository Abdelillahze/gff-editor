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
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
function trimAndUploadVideo(url, start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fluent_ffmpeg_1.default.ffprobe(url, (err, metaData) => {
                (0, fluent_ffmpeg_1.default)()
                    .input(url)
                    .inputOption([
                    `-ss ${Math.floor(start * 1000)}ms`,
                    `-to ${Math.floor(end * 1000)}ms`,
                ])
                    .videoCodec("libx264")
                    .audioCodec("aac")
                    .outputFormat("mp4")
                    .outputOptions(["-movflags frag_keyframe+empty_moov"])
                    .output(cloudinary_1.default.uploader.upload_stream({
                    folder: "gff clip",
                    resource_type: "video",
                }, (error, result) => {
                    console.log(result, "NOW FR FRRRRRRRRRRRRRR");
                    resolve(result.secure_url);
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                }), { end: true })
                    .on("end", () => {
                    console.log("finished fr");
                })
                    .on("error", (err) => {
                    console.log(err);
                })
                    .run();
            });
        });
    });
}
exports.default = trimAndUploadVideo;
