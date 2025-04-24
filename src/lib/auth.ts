import { db } from "@/server/db";
import { account, session, user, verification } from "@/server/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";

export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 34560000,
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
  plugins: [organization(), admin()],
});

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};
