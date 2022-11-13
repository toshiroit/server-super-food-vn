import { Router } from "express";
import { ROUTES_NAME_SHOP } from "../../../constants/routes_name";
import * as productShopController from '../../../controllers/shop/product/product.controller'
import { validateTokenAdminShopMiddleware } from "../../../middlewares/auth/auth.middleware";
import { validateResource } from "../../../middlewares/validateResource";
import { addProductShopSchema, addTypeProductSchema, getProductByCodeAndShopSchema } from "../../../schemas/shop/product/product.schema";
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

router.get(ROUTES_NAME_SHOP.PRODUCT.GET_ALL_TYPE_PRODUCT,
  validateTokenAdminShopMiddleware,
  productShopController.getAllProductType
)

router.post(
  ROUTES_NAME_SHOP.PRODUCT.ADD_TYPE_PRODUCT,
  validateTokenAdminShopMiddleware,
  validateResource(addTypeProductSchema),
  productShopController.addTypeProductByShop
)

router.delete(
  ROUTES_NAME_SHOP.PRODUCT.REMOVE_PRODUCT_BY_SHOP,
  validateTokenAdminShopMiddleware,
  productShopController.removeProductByShop
)

router.post(
  ROUTES_NAME_SHOP.PRODUCT.SEARCH_PRODUCT_BY_VALUE_AND_SHOP,
  validateTokenAdminShopMiddleware,
)

router.put(
  ROUTES_NAME_SHOP.PRODUCT.UPDATE_PRODUCT_PRODUCT_BY_CODE_AND_SHOP,
  validateTokenAdminShopMiddleware,
  validateResource(addProductShopSchema),
  productShopController.updateProductByCodeAndShop
)
export default router;
