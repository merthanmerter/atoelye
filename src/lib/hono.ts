import { Hono } from 'hono';
import type { auth } from './auth';

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export function honoRouter() {
  return new Hono<{ Bindings: AuthType }>({
    strict: false,
  });
}

export function hono() {
  const app = honoRouter();

  return app;
}
