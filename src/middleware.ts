import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DATAROOM_HOST = "dataroom.swarpfoundation.com";

export function middleware(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;
  const normalizedHost = host.split(":")[0].toLowerCase();
  const { pathname } = request.nextUrl;

  if (normalizedHost === DATAROOM_HOST && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dataroom";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
