import { Router } from "express";
import { ROUTES_NAME_SHOP } from "../../../constants/routes_name";
import * as uploadController from '../../../controllers/upload/upload.controller'
import multer from "multer";
import { uploadFile } from "../../../upload";

const upload = multer()
const router = Router()
router.post(ROUTES_NAME_SHOP.UPLOAD.image, uploadFile.single('image'), uploadController.uploadImage)
export default router;
