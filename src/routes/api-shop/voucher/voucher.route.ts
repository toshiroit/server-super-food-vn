import { Router } from 'express';
import { ROUTES_NAME_SHOP } from '../../../constants/routes_name';
import { validateTokenAdminShopMiddleware } from '../../../middlewares/auth/auth.middleware';
import * as voucherController from '../../../controllers/shop/voucher/voucher.controller';
const router = Router();

router.get(ROUTES_NAME_SHOP.VOUCHER.GET_ALL_VOUCHER, validateTokenAdminShopMiddleware, voucherController.getAllVoucher);
export default router;
