import { validateTokenAdminShopMiddleware } from './../../../middlewares/auth/auth.middleware';
import { Router } from 'express';
import { ROUTES_NAME_SHOP } from '../../../constants/routes_name';
import * as statisticalController from '../../../controllers/shop/statistical/statistical.controller';
const router = Router();
router.get(ROUTES_NAME_SHOP.STATISTICAL.GET_STATISTICAL_FULL, validateTokenAdminShopMiddleware, statisticalController.getStatisticalFull);
router.get(ROUTES_NAME_SHOP.STATISTICAL.GET_STATISTICAL, validateTokenAdminShopMiddleware, statisticalController.getStatisticalValue);
export default router;
