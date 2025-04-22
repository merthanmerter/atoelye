import { EmailTemplate } from "@/components/email-template";
import * as React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await resend.emails.send({
      from: "Atølye <info@atoelye.com>",
      to: [body.email],
      subject: "Atølye",
      react: EmailTemplate({ firstName: body.name }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
