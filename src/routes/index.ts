import { Router, Response } from 'express';
import userRoute from './api/user/user.route';
import authRoute from './api/auth/auth.route';
import productRoute from './api/product/product.route'
import commentRoute from './api/comment/comment.route'
import cartRoute from './api/cart/cart.route'
import searchRoute from './api/search/search.route'
import orderRoute from './api/order/order.route'
import addressRoute from './api/address/address.route'
import { ROUTES_NAME } from '../constants/routes_name';
import checkoutRoute from './api/checkout/checkout.route'
import paymentRoute from './api/payment/payment.route'
const router = Router();

/**
 *
 * Router test
 */

/**
 * Router User
 */
router.use(userRoute);
/**
 * Route auth
 */
router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/comment', commentRoute)
router.use('/cart', cartRoute)
router.use('/search', searchRoute)
router.use('/user', userRoute)
router.use(ROUTES_NAME.ADDRESS.HOME, addressRoute)
router.use(ROUTES_NAME.ORDER.HOME, orderRoute)
router.use(ROUTES_NAME.CHECKOUT, checkoutRoute)
router.use(ROUTES_NAME.PAYMENT.HOME, paymentRoute)
router.get('/', (res: Response) => {
  res.json({
    message: 'Hello world',
  });
});

export default router;
