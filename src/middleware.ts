import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req });

  if (!token) {
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
  }
}
export const config = {
  matcher: "/((?!api|_next|static|public).*)",
};
