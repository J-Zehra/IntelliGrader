/* eslint-disable no-restricted-exports */
/* eslint-disable import/prefer-default-export */

export { default } from "next-auth/middleware";

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.svg|signin|signup|logo_v2.svg|google.svg).*)",
};
