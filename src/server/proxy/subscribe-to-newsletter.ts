"use server";
import { db } from "@/server/db";
import { newsletter } from "@/server/db/schema";
import { getTranslations } from "next-intl/server";

export const subscribeToNewsletter = async (email: string) => {
  const t = await getTranslations("Layout");

  try {
    const [res] = await db
      .insert(newsletter)
      .values({ email })
      .returning({ email: newsletter.email });

    return {
      success: true,
      email: res.email,
      message: t("subscribeSuccess"),
    };
  } catch (error) {
    if (
      error instanceof Error &&
      "constraint" in error &&
      error.constraint === "newsletter_email_unique"
    ) {
      throw new Error(t("subscribeErrorDuplicate"));
    }
    throw new Error(t("subscribeErrorUnknown"));
  }
};
