import * as userController from '../../../controllers/user/user.controller'
import { Router } from 'express';
import { ROUTES_NAME } from '../../../constants/routes_name';
import { validateTokenMiddleware } from '../../../middlewares/auth/auth.middleware';
import { validateResource } from '../../../middlewares/validateResource';
import { updateUserW1Schema } from '../../../schemas/user/user.schema';
const router = Router();

router.post('');
router.put(ROUTES_NAME.USER.UPDATE_USER, validateTokenMiddleware, validateResource(updateUserW1Schema), userController.updateUser)
export default router;
