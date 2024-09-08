export function convertMillisecondsToRelativeTime(ms: number): string {
  // Convert milliseconds to total seconds
  const totalSeconds = Math.floor(ms / 1000);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the time as 'XmYs'
  return `${minutes}m${seconds}s`;
}
