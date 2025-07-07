import { hc } from 'hono/client';
import type { AppRouter } from '@/server/routes';

export const rpc = hc<AppRouter>(process.env.NEXT_PUBLIC_APP_URL ?? '', {
  init: {
    credentials: 'include',
  },
});
