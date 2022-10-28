import { Router } from "express";
import { ROUTES_NAME } from "../../../constants/routes_name";
import * as addressController from '../../../controllers/address/address.controller'
import { validateTokenMiddleware } from "../../../middlewares/auth/auth.middleware";
const router = Router()

router.get(ROUTES_NAME.ADDRESS.GET_ADDRESS, validateTokenMiddleware, addressController.getAddressByUser)

export default router;
