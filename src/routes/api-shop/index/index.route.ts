import { validateTokenAdminShopMiddleware } from './../../../middlewares/auth/auth.middleware';
import { Router } from 'express';
import * as indexController from '../../../controllers/index/index.controller';
import { ROUTES_NAME_SHOP } from '../../../constants/routes_name';

const router = Router();

router.get(ROUTES_NAME_SHOP.GET_INDEX_DATA.DATA, validateTokenAdminShopMiddleware, indexController.getAllIndexData);
export default router;
