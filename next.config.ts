import type { NextConfig } from "next";
import NextIntlPlugin from "next-intl/plugin";

const withNextIntl = NextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
