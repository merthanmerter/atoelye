import { auth } from '@/lib/auth';
import { hono } from '@/lib/hono';

export const authController = hono().on(['POST', 'GET'], '/**', (c) => {
  return auth.handler(c.req.raw);
});
