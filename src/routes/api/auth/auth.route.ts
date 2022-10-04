import { checkPhoneAuthSchema } from './../../../schemas/auth/auth.schema';
import {
  validateCapChaMiddleware,
  sendCodeLimiter,
  validateTokenAdminMiddleware,
} from './../../../middlewares/auth/auth.middleware';
import * as AuthController from './../../../controllers/auth/auth.controller';
import { Router } from 'express';
import { UserController } from '../../../controllers/user/user.controller';
import { validateResource } from '../../../middlewares/validateResource';
import {
  loginAuthPhone,
  loginAuthSchema,
  phoneAuthSendCode,
  registerAuthSchema,
  verifyAuthSchema,
} from '../../../schemas/auth/auth.schema';
import { ROUTES_NAME } from '../../../constants/routes_name';
import { loginAccountLimiter, validateTokenMiddleware } from '../../../middlewares/auth/auth.middleware';
const routes: Router = Router();
routes.post(ROUTES_NAME.AUTH.LOGIN, loginAccountLimiter, validateResource(loginAuthSchema), AuthController.loginUser);
routes.post(ROUTES_NAME.AUTH.REGISTER, validateResource(registerAuthSchema), AuthController.registerUser);
routes.post(
  ROUTES_NAME.AUTH.LOGIN_PHONE,
  loginAccountLimiter,
  validateTokenMiddleware,
  validateResource(loginAuthSchema),
  AuthController.loginUser
);
routes.post(ROUTES_NAME.AUTH.REFRESH_TOKEN, AuthController.refreshToken);
routes.get(ROUTES_NAME.AUTH.USER, validateTokenMiddleware, AuthController.getMe);
routes.get(ROUTES_NAME.AUTH.GET_ALL_USERS, validateTokenAdminMiddleware, AuthController.getAllUsers);
routes.post(ROUTES_NAME.AUTH.REST_PASSWORD, validateTokenMiddleware, (err, res) => {
  res.send({
    data: res.locals,
  });
});
routes.post(ROUTES_NAME.AUTH.VERIFY_CODE, validateTokenMiddleware, (err, res) => {
  res.json({
    message: 'Verify code',
  });
});
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
  `${ROUTES_NAME.AUTH.VERIFY_CODE}/:id/:verificationCode`,
  validateResource(verifyAuthSchema),
  AuthController.verifyAuthMailer
);
routes.post(ROUTES_NAME.AUTH.CHECK_PHONE, validateResource(checkPhoneAuthSchema), AuthController.checkPhoneAuth);
export default routes;
