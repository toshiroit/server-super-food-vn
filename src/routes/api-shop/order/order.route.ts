import { Router } from "express";
import { ROUTES_NAME_SHOP } from "../../../constants/routes_name";
import * as orderController from '../../../controllers/shop/order/order.controller'
import { validateTokenAdminShopMiddleware } from "../../../middlewares/auth/auth.middleware";
import { validateResource } from "../../../middlewares/validateResource";
import { hideOrderByShopSchema, removeOrderByShopSchema } from "../../../schemas/shop/order/order.schema";

const router = Router()

router.get(
  ROUTES_NAME_SHOP.ORDER.GET_ALL_ORDER_BY_SHOP,
  validateTokenAdminShopMiddleware,
  orderController.getAllOrderByShop)
router.get(
  ROUTES_NAME_SHOP.ORDER.GET_ALL_PRODUCT_BY_ORDER_AND_SHOP,
  validateTokenAdminShopMiddleware,
  orderController.getAllProductByOrderAndShop)
router.post(
  ROUTES_NAME_SHOP.ORDER.ADD_ORDER_BY_SHOP,
  validateTokenAdminShopMiddleware,
  orderController.addOrderByShop
)
router.post(
  ROUTES_NAME_SHOP.ORDER.HIDE_ORDER_BY_SHOP,
  validateTokenAdminShopMiddleware,
  validateResource(hideOrderByShopSchema),
  orderController.hideOrderByShop
)
router.delete(
  ROUTES_NAME_SHOP.ORDER.REMOVE_ORDER_BY_SHOP,
  validateTokenAdminShopMiddleware,
  validateResource(removeOrderByShopSchema),
  orderController.removeOrderByShop
)
router.get(
  ROUTES_NAME_SHOP.ORDER.GET_ORDER_DETAIL_BY_ORDER_AND_SHOP,
  validateTokenAdminShopMiddleware,
  orderController.getOrderDetailByOrderAndShop
)
router.put(
  ROUTES_NAME_SHOP.ORDER.CONFIRM_ORDER_BY_CODE_ORDER,
  validateTokenAdminShopMiddleware,
  orderController.confirmOrderByCodeOrder
)
export default router;
