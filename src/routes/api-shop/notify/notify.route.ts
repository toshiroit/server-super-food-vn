import { Router } from 'express';
import { validateTokenAdminShopMiddleware } from '../../../middlewares/auth/auth.middleware';
import * as notifyShopController from '../../../controllers/shop/notify/notify.controller';
import { ROUTES_NAME_SHOP } from '../../../constants/routes_name';
const router = Router();

router.get(ROUTES_NAME_SHOP.NOTIFY.GET_ALL_NOTIFY_SHOP, validateTokenAdminShopMiddleware, notifyShopController.getAllNotifyByShop);
router.get(ROUTES_NAME_SHOP.NOTIFY.GET_DETAIL_NOTIFY, validateTokenAdminShopMiddleware, notifyShopController.getDetailNotifyByShop);
router.post(ROUTES_NAME_SHOP.NOTIFY.ADD_NEW_NOTIFY_USER, validateTokenAdminShopMiddleware, notifyShopController.addNewNotifyByUser);
export default router;
