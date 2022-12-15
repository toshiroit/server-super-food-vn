import { validateTokenMiddleware } from './../../../middlewares/auth/auth.middleware';
import { Router } from 'express';
import { ROUTES_NAME } from '../../../constants/routes_name';
import * as notifyController from '../../../controllers/notify/notify.controller';
import * as notifyShopController from '../../../controllers/shop/notify/notify.controller';
const router = Router();

router.post(ROUTES_NAME.NOTIFY.ADD_NOTIFY_NEW_SHOP, validateTokenMiddleware, notifyController.addNewNotifyShop);
router.get(ROUTES_NAME.NOTIFY.GET_ALL_NOTIFY_USER, validateTokenMiddleware, notifyController.getAllNotifyUser);
export default router;
