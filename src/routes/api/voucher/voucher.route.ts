import { ROUTES_NAME } from './../../../constants/routes_name';
import { Router } from 'express';
import { validateTokenMiddleware } from '../../../middlewares/auth/auth.middleware';
import * as voucherController from '../../../controllers/voucher/voucher.controller';
const router = Router();

router.get(ROUTES_NAME.VOUCHER.CHECK_VOUCHER, validateTokenMiddleware, voucherController.checkVoucherProductByVoucherShop);
export default router;
