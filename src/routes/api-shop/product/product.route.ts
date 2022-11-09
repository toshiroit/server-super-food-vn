import { Router } from "express";
import { ROUTES_NAME_SHOP } from "../../../constants/routes_name";
import * as productShopController from '../../../controllers/shop/product/product.controller'
import { validateTokenAdminShopMiddleware } from "../../../middlewares/auth/auth.middleware";
import { validateResource } from "../../../middlewares/validateResource";
import { addProductShopSchema, getProductByCodeAndShopSchema } from "../../../schemas/shop/product/product.schema";
const router = Router()

router.get(ROUTES_NAME_SHOP.PRODUCT.GET_ALL_PRODUCT, validateTokenAdminShopMiddleware, productShopController.getAllProductShop)
router.post(
  ROUTES_NAME_SHOP.PRODUCT.ADD_PRODUCT,
  validateTokenAdminShopMiddleware,
  validateResource(addProductShopSchema),
  productShopController.addProductShop
)
router.get(ROUTES_NAME_SHOP.PRODUCT.GET_PRODUCT_BY_CODE,
  validateTokenAdminShopMiddleware,
  validateResource(getProductByCodeAndShopSchema),
  productShopController.getProductByCodeAndShop
)
export default router;
