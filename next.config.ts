import type { NextConfig } from "next";
import NextIntlPlugin from "next-intl/plugin";

const withNextIntl = NextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
};

export default withNextIntl(nextConfig);
