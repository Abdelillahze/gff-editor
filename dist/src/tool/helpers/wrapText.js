"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapText(ctx, text) {
    const maxWidth = 700;
    const words = text.split(" ");
    const lines = [];
    let line = [];
    let wordsWidth = 0;
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordLength = ctx.measureText(word).width;
        wordsWidth += wordLength;
        if (wordsWidth > maxWidth) {
            lines.push(line.join(" "));
            line = [];
            wordsWidth = wordLength;
            line.push(word);
        }
        else {
            line.push(word);
        }
    }
    lines.push(line.join(" "));
    return lines;
}
exports.default = wrapText;
