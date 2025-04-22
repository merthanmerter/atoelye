import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { cache } from "react";
import { db } from "../server/db/db";
import { account, session, user, verification } from "../server/db/schema";
import { generateMaxAge } from "./max-age";

export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: generateMaxAge("1 day"),
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      verification,
      session,
    },
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      console.log(data, request);
    },
  },
});

export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
});
