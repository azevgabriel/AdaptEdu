import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE_NAME = "adaptedu_session";

export const PRIVATE_ROUTES = [
  "/minha-sala",
  "/dashboard",
  "/turmas",
  "/planejamento",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // If unauthenticated user tries to access private routes, redirect to /login with returnUrl
  if (isPrivateRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user visits /login, redirect to destination or /minha-sala
  if (pathname === "/login" && sessionToken) {
    const returnUrl =
      request.nextUrl.searchParams.get("returnUrl") || "/minha-sala";
    const targetPath = returnUrl.startsWith("/") ? returnUrl : `/${returnUrl}`;
    const targetUrl = new URL(targetPath, request.url);
    return NextResponse.redirect(targetUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/minha-sala/:path*",
    "/dashboard/:path*",
    "/turmas/:path*",
    "/planejamento/:path*",
    "/login",
  ],
};

