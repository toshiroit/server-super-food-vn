import { Router } from 'express';
import { ROUTES_NAME_SHOP } from '../../../constants/routes_name';
import * as uploadController from '../../../controllers/upload/upload.controller';
import { uploadFile } from '../../../upload';

const router = Router();
router.post(ROUTES_NAME_SHOP.UPLOAD.image, uploadFile.single('image'), uploadController.uploadImage);
router.post(ROUTES_NAME_SHOP.UPLOAD.images, uploadFile.array('images', 10), uploadController.uploadImages);
export default router;
