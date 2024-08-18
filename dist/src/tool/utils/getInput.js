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
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
const puppeteer_1 = __importDefault(require("puppeteer"));
function getInput(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im);
            if (!match)
                return false;
            const domain = match.at(-1);
            switch (domain === null || domain === void 0 ? void 0 : domain.toLowerCase()) {
                case "youtube.com": {
                    const info = yield ytdl_core_1.default.getInfo(url.split(/=|&/g)[1]);
                    const format = ytdl_core_1.default.chooseFormat(info.formats, {
                        quality: "highest",
                    });
                    return format.url;
                }
                case "clips.twitch.tv": {
                    const browser = yield puppeteer_1.default.launch({ headless: true });
                    const page = yield browser.newPage();
                    yield page.goto(url);
                    let src = yield page.$eval("video", (n) => n.getAttribute("src"));
                    yield browser.close();
                    return src;
                }
                case "kick.com": {
                    const browser = yield puppeteer_1.default.launch({ headless: true });
                    const page = yield browser.newPage();
                    yield page.goto(`https://kick.com/adinross?clip=clip_01HQ6Z18F7HDADS1TSZGHG21GF`);
                    const videoUrl = yield page.$eval("body", (n) => n.textContent);
                    console.log(videoUrl);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.default = getInput;
