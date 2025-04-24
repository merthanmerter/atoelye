import { honoRouter } from "@/lib/hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
export const helloRouter = honoRouter().get(
  "/",
  zValidator(
    "query",
    z.object({
      message: z.string(),
    }),
  ),
  async (c) => {
    const { message } = c.req.valid("query");
    return c.html(`Hello ${message}`);
  },
);
