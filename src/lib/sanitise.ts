export function sanitiseString(input: string): string {
  return input
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function sanitiseForLog(input: string): string {
  // Mask any 13-digit sequences (potential ID numbers)
  return input.replace(/\d{13}/g, "[REDACTED]");
}
