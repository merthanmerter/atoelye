/**
 * @description Send an email using Resend.
 * We use fetch method to be able to use edge runtime.
 * @param {Object} params
 * @param {string} params.from
 * @param {string[]} params.to
 * @param {string} params.subject
 * @param {string} params.html
 * @returns {Promise<Object>}
 */
export const resend = async ({
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
