export function formatLastActive(dateString?: string | null) {
  if (!dateString) {
    return "N/A";
  }

  const now = Date.now();
  const date = new Date(dateString).getTime();

  if (Number.isNaN(date)) {
    return "N/A";
  }

  const msDifference = now - date;

  if (msDifference < 0) {
    return "N/A";
  }

  const hoursDifference = msDifference / 1000 / 60 / 60;

  if (hoursDifference < 1) {
    return "Just now";
  }

  if (hoursDifference < 24) {
    return `${Math.floor(hoursDifference)}h ago`;
  }

  const daysDifference = Math.floor(hoursDifference / 24);

  return `${daysDifference}d ago`;
}

function isISO8601(dateString: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(dateString);
}

export function formatISO8601Date(isoDateString?: unknown) {
  if (typeof isoDateString !== "string") {
    return "Invalid date";
  }

  if (!isISO8601(isoDateString)) {
    return "Invalid date";
  }

  const date = new Date(isoDateString);
  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}
