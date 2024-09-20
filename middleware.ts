import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const locales = ["zh", "en"];
const defaultLocale = "zh";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  defaultLocale,
  localePrefix: "always", // This will ensure the locale is always in the URL
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(pathname);

  // Handle root path
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }
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
// http://nycu-pal.com
