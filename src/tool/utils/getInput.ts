import ytdl from "@distube/ytdl-core";
import puppeteer from "puppeteer";
import axios from "axios";

export default async function getInput(url: string) {
  try {
    const match = url.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
    );

    if (!match) return false;

    const domain = match.at(-1);

    switch (domain?.toLowerCase()) {
      case "youtube.com": {
        const info = await ytdl.getInfo(url.split(/=|&/g)[1]);
        const format = ytdl.chooseFormat(info.formats, {
          quality: "highest",
        });

        return format.url;
      }
      case "clips.twitch.tv": {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url);

        let src = await page.$eval("video", (n) => n.getAttribute("src"));
        await browser.close();
        return src;
      }
      case "kick.com": {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(
          `https://kick.com/adinross?clip=clip_01HQ6Z18F7HDADS1TSZGHG21GF`
        );

        const videoUrl = await page.$eval("body", (n) => n.textContent);

        console.log(videoUrl);

        // return videoUrl;
      }
    }
  } catch (err: any) {
    console.log(err);
  }
}
