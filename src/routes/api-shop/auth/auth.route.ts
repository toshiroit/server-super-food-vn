import { Router } from "express";
import { ROUTES_NAME_SHOP } from "../../../constants/routes_name";
import { getMe, getMeShop, loginAuthAdmin } from "../../../controllers/auth/auth.controller";
import { validateTokenAdminShopMiddleware } from "../../../middlewares/auth/auth.middleware";
import { validateResource } from "../../../middlewares/validateResource";
import { loginAuthAdminSchema } from "../../../schemas/auth/auth.schema";
import { authRegisterShop } from "../../../schemas/shop/auth/auth.schema";
import * as  authShopController from '../../../controllers/shop/auth/auth.controller'
const router = Router()
router.post('/login', validateResource(loginAuthAdminSchema), loginAuthAdmin)
router.get(ROUTES_NAME_SHOP.AUTH.GET_ME, validateTokenAdminShopMiddleware, getMe)
router.get(ROUTES_NAME_SHOP.AUTH.GET_ME_SHOP, validateTokenAdminShopMiddleware, getMeShop)
router.post(ROUTES_NAME_SHOP.AUTH.REGISTER,
  validateResource(authRegisterShop),
  authShopController.authReister)
export default router;

