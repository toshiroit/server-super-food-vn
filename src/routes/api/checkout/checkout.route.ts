import { Router } from "express";
import * as checkoutController from '../../../controllers/checkout/checkout.controller'
import { validateTokenMiddleware } from "../../../middlewares/auth/auth.middleware";
const router = Router()

router.post('/user', validateTokenMiddleware, checkoutController.checkoutUser)

export default router;
