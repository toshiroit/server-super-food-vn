import { Router } from "express";
import { ROUTES_NAME_SHOP } from "../../../constants/routes_name";
import * as uploadController from '../../../controllers/upload/upload.controller'
const router = Router()
router.get(ROUTES_NAME_SHOP.UPLOAD.image, uploadController.uploadImages)
export default router;
