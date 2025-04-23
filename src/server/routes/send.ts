import { resend } from "@/lib/resend";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const sendRouter = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      email: z.string().email(),
      name: z.string().min(1),
    }),
  ),
  async (c) => {
    const { email, name } = c.req.valid("json");

    const res = await resend({
      from: "Atølye <info@atoelye.com>",
      to: [email],
      subject: "Atølye",
      html: `<p>Email: ${email}</p><p>Hello ${name}</p>`,
    }).catch((error) => {
      return c.json({ error: error.message }, 500);
    });

    return c.json(res);
  },
);
