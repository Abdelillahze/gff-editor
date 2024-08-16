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
const canvas_1 = require("canvas");
const wrapText_1 = __importDefault(require("./wrapText"));
const drawRoundedRect_1 = require("./drawRoundedRect");
function createText(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { text, x, y, fontSize, padding, borderRadius, style } = options;
        const canvas = (0, canvas_1.createCanvas)(1080, 1920);
        const ctx = canvas.getContext("2d");
        let width = 0;
        let height = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        (0, canvas_1.registerFont)("./src/fonts/inter.ttf", { family: "Inter" });
        ctx.font = `bold ${fontSize}px Inter`;
        ctx.textBaseline = "top";
        ctx.textAlign = "start";
        const lines = (0, wrapText_1.default)(ctx, text);
        lines.map((line, i) => {
            const size = ctx.measureText(line);
            console.log(line);
            if (size.width > width) {
                width += size.width;
            }
            height += size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
        });
        console.log(width, height);
        switch (style) {
            case "blackWhite": {
                ctx.fillStyle = "#000000";
                break;
            }
            case "whiteBlack": {
                ctx.fillStyle = "#ffffff";
                break;
            }
        }
        (0, drawRoundedRect_1.drawRoundedRect)(ctx, x - padding[0] / 2, y - padding[1] / 3, width + padding[0], height + padding[1] + (lines.length - 1) * 15, borderRadius);
        ctx.fill();
        switch (style) {
            case "blackWhite": {
                ctx.fillStyle = "#ffffff";
                break;
            }
            case "whiteBlack": {
                ctx.fillStyle = "#000000";
                break;
            }
        }
        lines.map((line, i) => {
            ctx.fillText(line, x, y + i * 60);
        });
        return canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
    });
}
exports.default = createText;
