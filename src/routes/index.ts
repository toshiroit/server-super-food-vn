import { Router, Request, Response } from 'express';
import userRoute from './api/user/user.route';
import authRoute from './api/auth/auth.route';
const routes = Router();

/**
 * Router User
 */
routes.use(userRoute);
/**
 * Route auth
 */
routes.use('/auth', authRoute);
routes.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world',
  });
});

export default routes;
