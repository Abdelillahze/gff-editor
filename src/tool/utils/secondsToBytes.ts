export default function secondsToBytes(bitrate: number, time: number) {
  const roundTime = Math.round(time * 100) / 100;
  const fileSize = (bitrate / 8) * roundTime;

  return Math.floor(fileSize);
}
