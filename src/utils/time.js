export function formatDateFromUnix(ts, timezoneOffsetSeconds = 0) {
  // ts is seconds
  const d = new Date((ts + timezoneOffsetSeconds) * 1000);
  const opts = { weekday: "long", month: "short", day: "numeric" };
  return d.toLocaleDateString(undefined, opts);
}

export function formatTimeFromUnix(ts, timezoneOffsetSeconds = 0) {
  const d = new Date((ts + timezoneOffsetSeconds) * 1000);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function dayShortFromUnix(ts, timezoneOffsetSeconds = 0) {
  const d = new Date((ts + timezoneOffsetSeconds) * 1000);
  return d.toLocaleDateString(undefined, { weekday: "short" });
}
