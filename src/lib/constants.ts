export const APP_NAME = "School Management App";

export const USER_ROLES = {
  ADMIN: "ADMIN",
  SUB_ADMIN: "SUB_ADMIN",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
  PARENT: "PARENT",
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  LATE: "LATE",
} as const;

export const EXAM_TYPES = {
  TERM: "TERM",
  UNIT: "UNIT",
  FINAL: "FINAL",
} as const;

export const FEE_FREQUENCY = {
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
  ONETIME: "ONETIME",
} as const;

export const PAYMENT_MODE = {
  CASH: "CASH",
  ONLINE: "ONLINE",
  BANK: "BANK",
} as const;

export const NOTICE_TARGET = {
  ALL: "ALL",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
  PARENT: "PARENT",
} as const;

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const OTP_EXPIRY_MINUTES = 10;
export const JWT_EXPIRY_DAYS = 7;