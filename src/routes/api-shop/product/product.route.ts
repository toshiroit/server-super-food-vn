import { Router } from "express";
import * as productShopController from '../../../controllers/shop/product/product.controller'
import { validateTokenAdminShopMiddleware } from "../../../middlewares/auth/auth.middleware";
const router = Router()

router.get('/get-all-product', validateTokenAdminShopMiddleware, productShopController.getAllProductShop)

export default router;
