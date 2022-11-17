import { Router } from "express";
import { ROUTES_NAME } from "../../../constants/routes_name";
import * as paymentController from '../../../controllers/payment/payment.controller'
const router = Router()

router.get(ROUTES_NAME.PAYMENT.GET_ALL_PAYMENT, paymentController.getAllPayment)
export default router;
