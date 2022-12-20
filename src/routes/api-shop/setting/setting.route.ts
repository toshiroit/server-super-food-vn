import { validateTokenAdminShopMiddleware } from './../../../middlewares/auth/auth.middleware';
import * as settingController from '../../../controllers/shop/setting/setting.controller';
import { Router } from 'express';
import { ROUTES_NAME_SHOP } from '../../../constants/routes_name';

const router = Router();
router.get(ROUTES_NAME_SHOP.SETTING.GET_SETTING, validateTokenAdminShopMiddleware, settingController.getSettingByShop);
router.put(ROUTES_NAME_SHOP.SETTING.UPDATE_SETTING, validateTokenAdminShopMiddleware, settingController.updateSettingByShop);
export default router;
