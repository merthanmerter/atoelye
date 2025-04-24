/**
 * We use http api instead of resend sdk because it's not supported on edge runtime
 * @see https://github.com/leerob/site/blob/3038b518f3e6746a9e6f7bb790d80ece37b484f8/app/actions.ts#L34-L64
 */
const send = async ({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string[];
  subject: string;
  html: string;
}): Promise<object> => {
  const data = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!data.ok) {
    throw new Error("Failed to send email") as Error;
  }

  return await data.json();
};

export const resend = {
  emails: {
    send,
  },
};
