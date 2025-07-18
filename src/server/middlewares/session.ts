import { createMiddleware } from 'hono/factory';
import { auth } from '@/lib/auth';

const sessionMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession(c.req.raw);

  if (!session) {
    c.status(401);
    return c.json({ message: 'Unauthorized' });
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

export default sessionMiddleware;
