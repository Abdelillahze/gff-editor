"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function secondsToBytes(bitrate, time) {
    const roundTime = Math.round(time * 100) / 100;
    const fileSize = (bitrate / 8) * roundTime;
    return Math.floor(fileSize);
}
exports.default = secondsToBytes;
