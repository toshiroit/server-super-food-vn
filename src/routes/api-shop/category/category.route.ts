import { Router } from "express";
import { ROUTES_NAME, ROUTES_NAME_SHOP } from "../../../constants/routes_name";
import * as categoryController from '../../../controllers/shop/category/category.controller'
import { validateTokenAdminShopMiddleware } from "../../../middlewares/auth/auth.middleware";

const router = Router()

router.get(ROUTES_NAME_SHOP.CATEGORY.CATEGORY_ALL, categoryController.getCategoryProductShop)
router.get(
  ROUTES_NAME_SHOP.CATEGORY.CATEGORY_ALL_BY_SHOP,
  validateTokenAdminShopMiddleware,
  categoryController.getAllCategoryByShop)
export default router;
