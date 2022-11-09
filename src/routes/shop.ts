import { Router } from "express";
import authShop from './api-shop/auth/auth.route'
import productShop from './api-shop/product/product.route'
import categoryShop from './api-shop/category/category.route'
import { ROUTES_NAME_SHOP } from "../constants/routes_name";
import uploadRoute from './api-shop/upload/upload.route'
import orderRoute from './api-shop/order/order.route'
const router = Router()
router.use('/auth', authShop)
router.use('/product', productShop)
router.use('/category', categoryShop)
router.use(ROUTES_NAME_SHOP.UPLOAD.home, uploadRoute)
router.use(ROUTES_NAME_SHOP.ORDER.HOME, orderRoute)
export default router;
