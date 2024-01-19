/* eslint-disable no-restricted-exports */
/* eslint-disable import/prefer-default-export */

export { default } from "next-auth/middleware";

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.svg|auth_bg.png|auth_bg_2.png|signin|signup|verify-notice|verify|logo_v2.svg|google.svg|manifest.json|icon-192x192.png|icon-256x256.png|icon-384x384.png|icon-512x512.png).*)",
};
