import express from "express";
import "dotenv/config";
import cors from "cors";
import createVideo from "./tool/createVideo";
import getInput from "./tool/utils/getInput";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.get("/health", (req, res) => {
  res.end("health");
});

app.post("/clip", async (req, res) => {
  try {
    console.log("slm");
    const { url, options } = req.body;
    console.log(url, options);

    const resUrl = await createVideo(url, options);
    res.end(resUrl);
  } catch (err) {
    console.log(err);
  }
});

app.post("/upload", async (req, res) => {
  try {
    const { options, url } = req.body;
    console.log(options, url);

    const useableUrl = await getInput(url);

    if (!useableUrl) return res.status(400);

    res.status(200).json({ data: useableUrl });
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("server started");
});

// createText("gmr bot", 50, 50, 45, [50, 45], 15, "whiteBlack");
