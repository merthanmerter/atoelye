import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../server/db/db";
import { account, session, user, verification } from "../server/db/schema";

export const auth = betterAuth({
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
