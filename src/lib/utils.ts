/** Format ISO date string for display — safe for client and server */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Format HH:MM:SS or MM:SS duration for display — safe for client and server */
export function formatDuration(duration: string): string {
  const parts = duration.split(":");
  if (parts.length === 2) {
    return `${parseInt(parts[0])} min`;
  }
  if (parts.length === 3) {
    const h = parseInt(parts[0]);
    const m = parseInt(parts[1]);
    return h > 0 ? `${h}h ${m}m` : `${m} min`;
  }
  return duration;
}
