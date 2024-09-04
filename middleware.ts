import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["zh", "en"],

  // Used when no locale matches
  defaultLocale: "zh",
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(pathname);
  if (
    // pathname.startsWith("/_next") ||
    pathname.includes("/imgs/") ||
    pathname.includes("/vdo/") ||
    pathname.includes("/admin") ||
    pathname.includes(".") // This will catch most static files
    // pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Apply the internationalization middleware
  return intlMiddleware(request);
}
export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
