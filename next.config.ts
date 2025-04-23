import type { NextConfig } from "next";
import NextIntlPlugin from "next-intl/plugin";

const withNextIntl = NextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "729bc76256ee99a1f54c65f01988fa3a.r2.cloudflarestorage.com",
    ],
  },
};

export default withNextIntl(nextConfig);
