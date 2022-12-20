import { authUpdateUserByShopSchema } from './../../../schemas/shop/auth/auth.schema';
import { ROUTES_NAME_SHOP } from './../../../constants/routes_name';
import { Router } from 'express';
import { getMe, getMeShop, loginAuthAdmin } from '../../../controllers/auth/auth.controller';
import { validateTokenAdminShopMiddleware } from '../../../middlewares/auth/auth.middleware';
import { validateResource } from '../../../middlewares/validateResource';
import { loginAuthAdminSchema } from '../../../schemas/auth/auth.schema';
import { authRegisterShop, authVerificationCode } from '../../../schemas/shop/auth/auth.schema';
import * as authShopController from '../../../controllers/shop/auth/auth.controller';
import * as authController from '../../../controllers/auth/auth.controller';
const router = Router();
router.post('/login', validateResource(loginAuthAdminSchema), loginAuthAdmin);
router.post(ROUTES_NAME_SHOP.AUTH.LOGIN_SECURITY, authShopController.authSecurityLogin);
router.post(ROUTES_NAME_SHOP.AUTH.VERIFICATION_ACCOUNT, authShopController.activeAccountRegister);
router.get(ROUTES_NAME_SHOP.AUTH.GET_ME, validateTokenAdminShopMiddleware, getMe);
router.get(ROUTES_NAME_SHOP.AUTH.GET_ME_SHOP, validateTokenAdminShopMiddleware, getMeShop);
router.post(ROUTES_NAME_SHOP.AUTH.REGISTER, validateResource(authRegisterShop), authShopController.authRegister);
router.post(ROUTES_NAME_SHOP.VERIFICATION.GET_VERIFICATION, validateResource(authVerificationCode), authShopController.getCodeVerificationAccount);
router.post(ROUTES_NAME_SHOP.AUTH.LOGOUT, authController.logoutUser);
router.get(ROUTES_NAME_SHOP.AUTH.CHECK_PASSWORD, validateTokenAdminShopMiddleware, authShopController.authCheckPasswordByUserShop);
router.post(
  ROUTES_NAME_SHOP.AUTH.UPDATE_USER,
  validateTokenAdminShopMiddleware,
  validateResource(authUpdateUserByShopSchema),
  authShopController.authUpdateUserByShop
);
router.delete(ROUTES_NAME_SHOP.AUTH.REMOVE_SHOP, validateTokenAdminShopMiddleware, authShopController.authRemoveShop);
router.get(ROUTES_NAME_SHOP.AUTH.REST_PASSWORD, authShopController.authRestNewPassword);
router.put(ROUTES_NAME_SHOP.AUTH.CONFIRM_REST_PASSWORD, authShopController.authConfirmRestPassword);
export default router;
