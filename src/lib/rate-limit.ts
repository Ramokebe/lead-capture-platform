import { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } from "./constants";

const requests = new Map<string, number[]>();

// Clean stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of Array.from(requests.entries())) {
    const valid = timestamps.filter(
      (t) => now - t < RATE_LIMIT_WINDOW * 1000
    );
    if (valid.length === 0) {
      requests.delete(key);
    } else {
      requests.set(key, valid);
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(ip: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const windowMs = RATE_LIMIT_WINDOW * 1000;
  const timestamps = (requests.get(ip) || []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    const oldestInWindow = timestamps[0];
    const retryAfter = Math.ceil((oldestInWindow + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }

  timestamps.push(now);
  requests.set(ip, timestamps);
  return { allowed: true };
}
