import { defineRouting } from "next-intl/routing";
import pathnames from "./data/paths.json";
export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "en",
  localeDetection: true,
  pathnames,
});
