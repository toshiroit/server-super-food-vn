import { Router } from "express";
import { ROUTES_NAME } from "../../../constants/routes_name";
import * as orderController from '../../../controllers/order/order.controller'
import { validateTokenMiddleware } from "../../../middlewares/auth/auth.middleware";
import { validateResource } from "../../../middlewares/validateResource";
import { getOrderDetailByCodeOrderSchema } from "../../../schemas/order/order.schema";
const router = Router()

router.get(ROUTES_NAME.ORDER.GET_ORDER_BY_USER, validateTokenMiddleware, orderController.getOrderByUser)
router.get(
  ROUTES_NAME.ORDER.GET_ORDER_DETAIL_BY_CODE,
  validateTokenMiddleware,
  validateResource(getOrderDetailByCodeOrderSchema),
  orderController.getOrderDetailByCodeOrder)
export default router;
