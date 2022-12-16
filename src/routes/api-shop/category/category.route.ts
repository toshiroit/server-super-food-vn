import { Router } from 'express';
import { ROUTES_NAME, ROUTES_NAME_SHOP } from '../../../constants/routes_name';
import * as categoryController from '../../../controllers/shop/category/category.controller';
import { validateTokenAdminShopMiddleware } from '../../../middlewares/auth/auth.middleware';

const router = Router();

router.get(ROUTES_NAME_SHOP.CATEGORY.CATEGORY_BY_PRODUCT_SHOP, validateTokenAdminShopMiddleware, categoryController.getCategoryProductShop);
router.get(ROUTES_NAME_SHOP.CATEGORY.CATEGORY_ALL_BY_SHOP, validateTokenAdminShopMiddleware, categoryController.getAllCategoryByShop);

router.post(ROUTES_NAME_SHOP.CATEGORY.ADD_NEW_CATEGORY, validateTokenAdminShopMiddleware, categoryController.addNewCategoryByShop);
router.delete(ROUTES_NAME_SHOP.CATEGORY.REMOVE_CATEGORY, validateTokenAdminShopMiddleware, categoryController.removeCategoryByShop);
router.put(ROUTES_NAME_SHOP.CATEGORY.UPDATE_CATEGORY, validateTokenAdminShopMiddleware, categoryController.updateCategoryByShop);
export default router;
