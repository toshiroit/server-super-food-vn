import { Router } from 'express';
import { ROUTES_NAME_SHOP } from '../../../constants/routes_name';
import { validateTokenAdminShopMiddleware } from '../../../middlewares/auth/auth.middleware';
import * as voucherController from '../../../controllers/shop/voucher/voucher.controller';
const router = Router();

router.get(ROUTES_NAME_SHOP.VOUCHER.GET_ALL_VOUCHER, validateTokenAdminShopMiddleware, voucherController.getAllVoucher);
router.post(ROUTES_NAME_SHOP.VOUCHER.ADD_NEW_VOUCHER, validateTokenAdminShopMiddleware, voucherController.addNewVoucherByShop);
router.put(ROUTES_NAME_SHOP.VOUCHER.UPDATE_VOUCHER, validateTokenAdminShopMiddleware, voucherController.updateVoucherByShop);
router.delete(ROUTES_NAME_SHOP.VOUCHER.REMOVE_VOUCHER, validateTokenAdminShopMiddleware, voucherController.removeVoucherShopByCode);
router.get(ROUTES_NAME_SHOP.VOUCHER.GET_DETAIL_VOUCHER, validateTokenAdminShopMiddleware, voucherController.getDetailVoucherShopByCode);
export default router;
