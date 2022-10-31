import { Router } from "express";
import authShop from './api-shop/auth/auth.route'
import productShop from './api-shop/product/product.route'
import categoryShop from './api-shop/category/category.route'
const router = Router()
router.use('/auth', authShop)
router.use('/product', productShop)
router.use('/category', categoryShop)
export default router;


