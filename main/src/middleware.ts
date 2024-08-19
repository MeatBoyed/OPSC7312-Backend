import { createMiddleware } from "hono/factory";
const isStaticPath = (path: string) => {
  return path.startsWith("/_next") || path.startsWith("/favicon.ico");
};

// export async function middleware(request: NextRequest) {
const LocaleMiddleware = createMiddleware(async (c, next) => {
  //   const requestPath = request.nextUrl.pathname;
  //   const country = request.geo?.country ?? "Country";
  //   if (isStaticPath(requestPath)) {
  //     return NextResponse.next();
  //   }
  //   if (requestPath.startsWith("/api")) {
  //     // TODO: implement rate limiting
  //     const isRatelimited = false;
  //     if (isRatelimited) {
  //       return NextResponse.json(
  //         {
  //           error: "Too many requests, please try again later.",
  //         },
  //         { status: 429 }
  //       );
  //     }
  //   }
  //   const clientIp = getClientIp(request);
  //   console.log(`${request.method} ${clientIp} (${country}) -> ${requestPath}`);
});
