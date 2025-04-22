"use server";

import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { user } from "../db/schema";

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
