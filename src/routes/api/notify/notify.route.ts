import { Router } from "express";
import { ROUTES_NAME } from "../../../constants/routes_name";
import { validateTokenMiddleware } from "../../../middlewares/auth/auth.middleware";
import * as notifyController from '../../../controllers/notify/notify.controller'
import * as notifyShopController from '../../../controllers/shop/notify/notify.controller'
const router = Router()

router.post(ROUTES_NAME.NOTIFY.ADD_NOTIFY_NEW_SHOP, validateTokenMiddleware, notifyController.addNewNotifyShop)
export default router;
