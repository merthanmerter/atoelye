// app/api/do-something/route.ts
import { db } from "@/server/db";
import { newsletter } from "@/server/db/schema";
import { getTranslations } from "next-intl/server";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const t = await getTranslations("Layout");
  try {
    const body = await req.formData();
    const email = body.get("email");
    const validatedEmail = z.string().email().parse(email);

    await db.insert(newsletter).values({ email: validatedEmail });

    return Response.json({ message: t("subscribeSuccess") }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: t("subscribeErrorInvalidEmail") },
        { status: 400 },
      );
    }
    if (
      error instanceof Error &&
      "constraint" in error &&
      error.constraint === "newsletter_email_unique"
    ) {
      return Response.json(
        { message: t("subscribeErrorDuplicate") },
        { status: 400 },
      );
    }
    return Response.json(
      { message: t("subscribeErrorUnknown") },
      { status: 500 },
    );
  }
}
