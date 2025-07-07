import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { honoRouter } from '@/lib/hono';
import { resend } from '@/lib/resend';

export const sendRouter = honoRouter().post(
  '/',
  zValidator(
    'json',
    z.object({
      email: z.string().email(),
      name: z.string().min(1),
    })
  ),
  async (c) => {
    const { email, name } = c.req.valid('json');

    const res = await resend.emails
      .send({
        from: 'Inalcom <info@inalcocompany.com>',
        to: [email],
        subject: 'Inalcom',
        // react: We use html template instead of react template because it's not supported on edge runtime
        html: template(name),
      })
      .catch((error) => {
        return c.json({ error: error.message }, 500);
      });

    return c.json(res);
  }
);

const template = (name: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Welcome to Inalcom</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: sans-serif; background-color: white; margin: 0; padding: 0; }
      .container { max-width: 580px; margin: 24px auto; padding: 24px; background-color: #f3f4f6; border-radius: 8px; }
      .heading { font-size: 24px; font-weight: bold; color: #111827; text-align: center; margin: 32px 0; }
      .text { font-size: 16px; line-height: 1.5; color: #111827; margin: 16px 0; padding: 0 24px; }
      .button-container { text-align: center; margin: 32px 0; }
      .button { background-color: #222222; color: white !important; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-size: 16px; }
      .text-right { text-align: right; }
      .divider { border-top: 1px solid #374151; margin: 20px 0; }
      .footer { color: #9ca3af; font-size: 12px; line-height: 1.5; text-align: center; margin-top: 16px; padding: 0 24px; }
      .link { color: #222222 !important; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="heading">Welcome to Inalcom!</h1>
      <p class="text">Hello ${name},</p>
      <p class="text">We're thrilled to welcome you to the Inalcom community. Thank you for joining us on this journey.</p>
      <div class="button-container">
        <a href="https://inalcom.com" class="button">Get Started</a>
      </div>
      <p class="text">If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
      <p class="text text-right">
        Best regards,<br>
        The Inalcom Team
      </p>
      <hr class="divider">
      <p class="footer">
        © ${new Date().getFullYear()} Inalcom. All rights reserved.<br>
        <a href="https://inalcom.com/privacy" class="link">Privacy Policy</a> •
        <a href="https://inalcom.com/terms" class="link">Terms of Service</a>
      </p>
    </div>
  </body>
</html>`;
