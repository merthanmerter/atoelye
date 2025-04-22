import { z } from "zod";

const maxAgeSchema = z.string().refine(
  (value) => {
    const pattern = /^(\d+)\s+(day|days|week|weeks|month|months|year|years)$/;
    return pattern.test(value);
  },
  {
    message:
      "Invalid duration format. Examples: '10 days', '1 day', '3 weeks', '1 month', '3 years', '1 year'",
  },
);

export const generateMaxAge = (
  duration: z.infer<typeof maxAgeSchema>,
): number => {
  const parsedDuration = maxAgeSchema.parse(duration);
  const [amount, unit] = parsedDuration.split(" ");
  const now = new Date();

  const amountNum = parseInt(amount);

  switch (unit) {
    case "day":
    case "days":
      now.setDate(now.getDate() + amountNum);
      break;
    case "week":
    case "weeks":
      now.setDate(now.getDate() + amountNum * 7);
      break;
    case "month":
    case "months":
      now.setMonth(now.getMonth() + amountNum);
      break;
    case "year":
    case "years":
      now.setFullYear(now.getFullYear() + amountNum);
      break;
  }

  return now.getTime();
};
