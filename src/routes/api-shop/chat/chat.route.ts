import { validateTokenAdminShopMiddleware, validateTokenMiddleware } from './../../../middlewares/auth/auth.middleware';
import { ROUTES_NAME } from './../../../constants/routes_name';
import { Router } from 'express';
import * as messengerChatShopController from '../../../controllers/shop/chat/chat.controller';
const router = Router();

router.post(ROUTES_NAME.CHAT.SEND_CHAT, validateTokenAdminShopMiddleware, messengerChatShopController.sendMessengerChatShop);
router.get(ROUTES_NAME.CHAT.GET_ALL_CHAT, validateTokenAdminShopMiddleware, messengerChatShopController.getAllMessengerChatByCode);
export default router;
