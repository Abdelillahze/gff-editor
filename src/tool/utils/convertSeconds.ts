export default function convertSeconds(seconds: number) {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // Format hours, minutes, and seconds with leading zeros if necessary
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secs.toFixed(2).padStart(2, "0");

  // Return formatted time in hh:mm:ss
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
