import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const ROLE_ROUTES: Record<string, string[]> = {
  "/admin": ["ADMIN", "SUB_ADMIN"],
  "/teacher": ["TEACHER"],
  "/student": ["STUDENT"],
  "/parent": ["PARENT"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if route is protected
  const matchedRole = Object.keys(ROLE_ROUTES).find((route) => pathname.startsWith(route));
  if (!matchedRole) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userRole = payload.role as string;
    const allowedRoles = ROLE_ROUTES[matchedRole];

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Add tenant info to headers for API routes
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-tenant-id", payload.tenantId as string);
    requestHeaders.set("x-user-id", payload.userId as string);
    requestHeaders.set("x-user-role", userRole);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*", "/parent/:path*"],
};