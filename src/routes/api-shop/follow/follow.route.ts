import { Router } from 'express';
import { ROUTES_NAME_SHOP } from '../../../constants/routes_name';
import { validateTokenAdminShopMiddleware } from '../../../middlewares/auth/auth.middleware';
import * as followShopController from '../../../controllers/shop/follow/follow.controller';
const router = Router();
router.get(ROUTES_NAME_SHOP.FOLLOW.GET_USER_FOLLOW_BY_SHOP, validateTokenAdminShopMiddleware, followShopController.getAllUserFollowByShop);
export default router;
