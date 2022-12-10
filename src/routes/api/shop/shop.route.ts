import { Router } from 'express';
import { ROUTES_NAME, ROUTES_NAME_SHOP } from '../../../constants/routes_name';
import * as shopController from '../../../controllers/shop/info/info.controller';
import { validateTokenMiddleware } from '../../../middlewares/auth/auth.middleware';
const router = Router();

router.get(ROUTES_NAME.SHOP.DETAIL_SHOP, shopController.shopInfoDetailByCodeShop);
router.get(ROUTES_NAME.SHOP.PRODUCT_SHOP, shopController.getAllProductByShop);
router.post(ROUTES_NAME.SHOP.FOLLOW_SHOP, validateTokenMiddleware, shopController.followShopByUser);
router.delete(ROUTES_NAME.SHOP.DISABLE_FOLLOW_SHOP, validateTokenMiddleware, shopController.disableFollowShopByUser);
router.get(ROUTES_NAME.SHOP.CATEGORY_SHOP, shopController.getAllCategoryShop);
export default router;
