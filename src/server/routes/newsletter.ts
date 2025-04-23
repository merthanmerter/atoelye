// app/api/do-something/route.ts
import { db } from "@/server/db";
import { newsletter } from "@/server/db/schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export const newsletterRouter = new Hono().post(
  "/",
  zValidator("form", z.object({ email: z.string().email() })),
  async (c) => {
    console.log("newsletter");
    const { email } = c.req.valid("form");
    const t = await getTranslations("Layout");
    try {
      await db.insert(newsletter).values({ email });
      return c.json({ message: t("subscribeSuccess") }, 200);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ message: t("subscribeErrorInvalidEmail") }, 400);
      }
      if (
        error instanceof Error &&
        "constraint" in error &&
        error.constraint === "newsletter_email_unique"
      ) {
        return c.json({ message: t("subscribeErrorDuplicate") }, 400);
      }
      return c.json({ message: t("subscribeErrorUnknown") }, 500);
    }
  },
);
