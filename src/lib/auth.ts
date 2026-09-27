import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function generateToken(payload: {
  userId: string;
  role: UserRole;
  tenantId: string;
}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): {
  userId: string;
  role: UserRole;
  tenantId: string;
} {
  return jwt.verify(token, JWT_SECRET) as any;
}

export function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function getDashboardByRole(role: UserRole): string {
  const routes: Record<UserRole, string> = {
    ADMIN: "/admin/dashboard",
    SUB_ADMIN: "/admin/dashboard",
    TEACHER: "/teacher/dashboard",
    STUDENT: "/student/dashboard",
    PARENT: "/parent/dashboard",
  };
  return routes[role] || "/";
}