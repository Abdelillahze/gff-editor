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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const createVideo_1 = __importDefault(require("./tool/createVideo"));
const getInput_1 = __importDefault(require("./tool/utils/getInput"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
}));
app.get("/health", (req, res) => {
    res.end("health");
});
app.post("/clip", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("slm");
        const { url, options } = req.body;
        console.log(url, options);
        const resUrl = yield (0, createVideo_1.default)(url, options);
        res.end(resUrl);
    }
    catch (err) {
        console.log(err);
    }
}));
app.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { options, url } = req.body;
        console.log(options, url);
        const useableUrl = yield (0, getInput_1.default)(url);
        if (!useableUrl)
            return res.status(400);
        res.status(200).json({ data: useableUrl });
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(5000, () => {
    console.log("server started");
});
