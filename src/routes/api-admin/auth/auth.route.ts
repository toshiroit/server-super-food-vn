import { Router } from "express";
import { ROUTES_NAME_ADMIN } from "../../../constants/routes_name";
import { getMe, loginAuthAdmin } from "../../../controllers/auth/auth.controller";
import { validateTokenAdminMiddleware } from "../../../middlewares/auth/auth.middleware";
import { validateResource } from "../../../middlewares/validateResource";
import { loginAuthAdminSchema } from "../../../schemas/auth/auth.schema";

const router = Router()
router.post('/login', validateResource(loginAuthAdminSchema), loginAuthAdmin)
router.get(ROUTES_NAME_ADMIN.AUTH.GET_ME, validateTokenAdminMiddleware, getMe)
export default router;

