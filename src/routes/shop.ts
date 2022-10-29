import { Router } from "express";
import authShop from './api-shop/auth/auth.route'
import productShop from './api-shop/product/product.route'
const router = Router()
router.use('/auth', authShop)
router.use('/product', productShop)

export default router;


