import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { middleware, SESSION_COOKIE_NAME } from "./middleware";

describe("Next.js Auth Middleware", () => {
  it("redirects unauthenticated user accessing private route to /login with returnUrl", () => {
    const request = new NextRequest("http://localhost:5173/minha-sala/carteiras");
    const response = middleware(request);

    expect(response).toBeDefined();
    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe(
      "http://localhost:5173/login?returnUrl=%2Fminha-sala%2Fcarteiras",
    );
  });

  it("allows authenticated user with session cookie to proceed to private route", () => {
    const request = new NextRequest("http://localhost:5173/minha-sala", {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=valid_jwt_token`,
      },
    });
    const response = middleware(request);

    expect(response?.headers.get("location")).toBeNull();
    expect(response?.status).toBe(200);
  });

  it("redirects authenticated user visiting /login to /minha-sala", () => {
    const request = new NextRequest("http://localhost:5173/login", {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=valid_jwt_token`,
      },
    });
    const response = middleware(request);

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("http://localhost:5173/minha-sala");
  });

  it("redirects authenticated user visiting /login with returnUrl to specified returnUrl", () => {
    const request = new NextRequest(
      "http://localhost:5173/login?returnUrl=%2Fdashboard",
      {
        headers: {
          cookie: `${SESSION_COOKIE_NAME}=valid_jwt_token`,
        },
      },
    );
    const response = middleware(request);

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("http://localhost:5173/dashboard");
  });

  it("normalizes returnUrl that does not start with slash when redirecting", () => {
    const request = new NextRequest(
      "http://localhost:5173/login?returnUrl=turmas",
      {
        headers: {
          cookie: `${SESSION_COOKIE_NAME}=valid_jwt_token`,
        },
      },
    );
    const response = middleware(request);

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("http://localhost:5173/turmas");
  });

  it("allows unauthenticated user to view /login page", () => {
    const request = new NextRequest("http://localhost:5173/login");
    const response = middleware(request);

    expect(response?.headers.get("location")).toBeNull();
    expect(response?.status).toBe(200);
  });

  it("allows public static assets or unmatched routes", () => {
    const request = new NextRequest("http://localhost:5173/about");
    const response = middleware(request);

    expect(response?.headers.get("location")).toBeNull();
    expect(response?.status).toBe(200);
  });
});