// import { jwtDecode } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  //   checking tokens
  const sessionToken = req.cookies.get("sessionToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("Middleware has been called");
  console.log(refreshToken);
  // getting the path
  const path = req.nextUrl.pathname;
  const isAuthRoute = path.startsWith("/auth/");
  const isUserRoute = path.startsWith("/user/");
  const isAdminRoute = path.startsWith("/admin/");

  // redirecting user based on tokens
  if (!sessionToken) {
    if (path === "/auth/reset-password") {
      return NextResponse.redirect(
        new URL("/auth/forgot-password", req.nextUrl),
      );
    } else if (path === "/auth/complete-registration") {
      return NextResponse.redirect(new URL("/auth/register", req.nextUrl));
    }
  }
  if (!refreshToken && (isUserRoute || isAdminRoute)) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirect=${path}`, req.nextUrl),
    );
  }
  if (refreshToken) {
    // redirecting user based on roles
    const { role } = jwtDecode<{ role: string }>(refreshToken);
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    } else if (role === "user" && isAdminRoute) {
      return NextResponse.redirect(new URL("/user/dashboard", req.nextUrl));
    } else if (role === "admin" && isUserRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
};
