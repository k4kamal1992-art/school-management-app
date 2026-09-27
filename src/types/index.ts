export type UserRole = "ADMIN" | "SUB_ADMIN" | "TEACHER" | "STUDENT" | "PARENT";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

export type ExamType = "TERM" | "UNIT" | "FINAL";

export type FeeFrequency = "MONTHLY" | "YEARLY" | "ONETIME";

export type PaymentMode = "CASH" | "ONLINE" | "BANK";

export type NoticeTarget = "ALL" | "TEACHER" | "STUDENT" | "PARENT";

export interface Tenant {
  id: string;
  schoolId: string;
  name: string;
  type?: string;
  address?: string;
  district?: string;
  state?: string;
  phone?: string;
  email?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  tenantId: string;
  name: string;
  mobile: string;
  email?: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  details?: string;
}