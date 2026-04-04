export const LEAD_STATUS = {
  NEW: "new",
  QUALIFIED: "qualified",
  SUBMITTED: "submitted",
  DECLINED: "declined",
} as const;

export const MAX_ID_LENGTH = 13;
export const RATE_LIMIT_WINDOW = 900; // 15 minutes in seconds
export const RATE_LIMIT_MAX = 5;
