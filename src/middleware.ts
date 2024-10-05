/* eslint-disable @typescript-eslint/no-explicit-any */
import { wibuMiddleware } from "wibu";
import { wibuConfig } from "./lib/wibu_config";
const WIBU_ENCODED_KEY = process.env.WIBU_ENCODED_KEY!;
console.log(WIBU_ENCODED_KEY, "WIBU_ENCODED_KEY");

export const middleware = (req: any) =>
  wibuMiddleware({
    req,
    config: {
      apiPath: "/api",
      exp: "7 yeas",
      loginPath: "/login",
      publicRoutes: ["/login", "/register", "/login/verify"],
      publicRoutePatterns: [/^\/api\/login\/\w+/, /^\/login\/verify\/\w+/],
      userPath: "/user",
      sessionKey: wibuConfig.wibuSessionKey
    },
    encodedKey: WIBU_ENCODED_KEY
  });

// Konfigurasi buat middleware Next.js
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"]
};
