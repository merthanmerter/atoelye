import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { honoRouter } from '@/lib/hono';
export const helloRouter = honoRouter().get(
  '/',
  zValidator(
    'query',
    z.object({
      message: z.string(),
    })
  ),
  (c) => {
    const { message } = c.req.valid('query');
    return c.html(`Hello ${message}`);
  }
);
