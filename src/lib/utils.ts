import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateGrade(marks: number, fullMarks: number = 100): string {
  const percentage = (marks / fullMarks) * 100;
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 33) return "D";
  return "F";
}

export function calculateGPA(marks: number, fullMarks: number = 100): number {
  const percentage = (marks / fullMarks) * 100;
  if (percentage >= 90) return 4.0;
  if (percentage >= 80) return 3.6;
  if (percentage >= 70) return 3.2;
  if (percentage >= 60) return 2.8;
  if (percentage >= 50) return 2.4;
  if (percentage >= 33) return 2.0;
  return 0;
}

export const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-pink-500",
  SUB_ADMIN: "bg-purple-500",
  TEACHER: "bg-accent",
  STUDENT: "bg-primary",
  PARENT: "bg-warning",
};

export const ATTENDANCE_COLORS: Record<string, string> = {
  PRESENT: "bg-accent text-accent border-accent",
  ABSENT: "bg-danger text-danger border-danger",
  LATE: "bg-warning text-warning border-warning",
};