import { checkPhoneAuthSchema, verifyCodePhoneAuth } from './../../../schemas/auth/auth.schema';
import {
  sendCodeLimiter,
  validateTokenAdminMiddleware,
} from './../../../middlewares/auth/auth.middleware';
import * as AuthController from './../../../controllers/auth/auth.controller';
import { Router } from 'express';
import { validateResource } from '../../../middlewares/validateResource';
import {
  loginAuthSchema,
  phoneAuthSendCode,
  registerAuthSchema,
  verifyAuthSchema,
} from '../../../schemas/auth/auth.schema';
import { ROUTES_NAME } from '../../../constants/routes_name';
import { loginAccountLimiter, validateTokenMiddleware } from '../../../middlewares/auth/auth.middleware';
const routes: Router = Router();

/**
 * Login user
 */
routes.post(ROUTES_NAME.AUTH.LOGIN, loginAccountLimiter, validateResource(loginAuthSchema), AuthController.loginUser);
/**
 * Logout user
 */
routes.post(ROUTES_NAME.AUTH.LOGOUT, AuthController.logoutUser);
/**
 * Register user
 */
routes.post(ROUTES_NAME.AUTH.REGISTER, validateResource(registerAuthSchema), AuthController.registerUser);

/**
 * Login phone user
 */
routes.post(
  ROUTES_NAME.AUTH.LOGIN_PHONE,
  loginAccountLimiter,
  validateTokenMiddleware,
  validateResource(loginAuthSchema),
  AuthController.loginUser
);
/**
 * Refresh token
 */
routes.post(ROUTES_NAME.AUTH.REFRESH_TOKEN, AuthController.refreshToken);
/**
 * Get info user
 */
routes.get(ROUTES_NAME.AUTH.USER, validateTokenMiddleware, AuthController.getMe);
/**
 * Get All user
 * Login => true => role admin
 */
routes.get(ROUTES_NAME.AUTH.GET_ALL_USERS, validateTokenAdminMiddleware, AuthController.getAllUsers);

/**
 * Rest password user
 * Login => true of false => role admin - shop - user
 */
routes.post(ROUTES_NAME.AUTH.REST_PASSWORD, validateTokenMiddleware, (err, res) => {
  res.send({
    data: res.locals,
  });
});

/**
 * Verify code
 * Verify user by code save database
 */
routes.post(ROUTES_NAME.AUTH.VERIFY_CODE, validateTokenMiddleware, (err, res) => {
  res.json({
    message: 'Verify code',
  });
});
/**
 * Verify token user
 */
routes.post(
  ROUTES_NAME.AUTH.VERIFY_TOKEN,
  validateTokenMiddleware,
  validateResource(loginAuthSchema),
  AuthController.VerifyTokenUser
);
// Send code change phone user
routes.post(
  ROUTES_NAME.AUTH.SEND_CODE,
  sendCodeLimiter,
  validateResource(phoneAuthSendCode),
  AuthController.SendCodePhone
);
routes.post(
  ROUTES_NAME.AUTH.CHECK_CODE,
  sendCodeLimiter,
  validateResource(verifyCodePhoneAuth),
  AuthController.verifyCodeAuth
);
routes.post(
  `${ROUTES_NAME.AUTH.VERIFY_CODE}/:id/:verificationCode`,
  validateResource(verifyAuthSchema),
  AuthController.verifyAuthMailer
);
routes.post(ROUTES_NAME.AUTH.CHECK_PHONE, validateResource(checkPhoneAuthSchema), AuthController.checkPhoneAuth);
export default routes;
