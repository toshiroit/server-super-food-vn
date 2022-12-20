import { Router } from 'express';
import { ROUTES_NAME } from '../../../constants/routes_name';
import * as orderController from '../../../controllers/order/order.controller';
import { validateTokenMiddleware } from '../../../middlewares/auth/auth.middleware';
import { validateResource } from '../../../middlewares/validateResource';
import { getOrderDetailByCodeOrderSchema } from '../../../schemas/order/order.schema';
const router = Router();

router.get(ROUTES_NAME.ORDER.GET_ORDER_BY_USER, validateTokenMiddleware, orderController.getOrderByUser);
router.get(
  ROUTES_NAME.ORDER.GET_ORDER_DETAIL_BY_CODE,
  validateTokenMiddleware,
  validateResource(getOrderDetailByCodeOrderSchema),
  orderController.getOrderDetailByCodeOrder
);
router.post(ROUTES_NAME.ORDER.CONFIRM_ORDER_SUCCESS, validateTokenMiddleware, orderController.confirmOrderSuccessUser);
export default router;
