import { Router, Request, Response } from 'express';
import userRoute from './api/user/user.route';
import authRoute from './api/auth/auth.route';
import productRoute from './api/product/product.route'
import commentRoute from './api/comment/comment.route'
import cartRoute from './api/cart/cart.route'
const routes = Router();

/**
 *
 * Router test
 */

/**
 * Router User
 */
routes.use(userRoute);
/**
 * Route auth
 */
routes.use('/auth', authRoute);
routes.use('/product', productRoute);
routes.use('/comment', commentRoute)
routes.use('/cart', cartRoute)
routes.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world',
  });
});

export default routes;
