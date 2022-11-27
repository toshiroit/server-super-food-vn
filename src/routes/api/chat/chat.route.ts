import { validateTokenMiddleware } from './../../../middlewares/auth/auth.middleware';
import { ROUTES_NAME } from './../../../constants/routes_name';
import { Router } from 'express';
import * as messengerChatController from '../../../controllers/chat/chat.controller';
const router = Router();

router.post(ROUTES_NAME.CHAT.SEND_CHAT, validateTokenMiddleware, messengerChatController.sendMessengerChat);
router.get(ROUTES_NAME.CHAT.GET_ALL_CHAT, validateTokenMiddleware, messengerChatController.getAllMessengerChatByCode);
export default router;
