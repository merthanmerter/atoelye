import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "en",
  localeDetection: true,
  pathnames: {
    "/": "/",
    "/test": {
      tr: "/deneme",
    },
    "/login": {
      tr: "/giris",
    },
    "/register": {
      tr: "/kayit",
    },
  },
});
