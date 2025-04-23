"use server";

import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getUserById = async (id?: string) => {
  if (!id) {
    return null;
  }
  try {
    const [res] = await db.select().from(user).where(eq(user.id, id));
    if (!res) {
      throw new Error("User not found");
    }
    return res;
  } catch (error) {
    throw error;
  }
};
