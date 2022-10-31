import { Router } from "express";
import { ROUTES_NAME_SHOP } from "../../../constants/routes_name";
import * as categoryController from '../../../controllers/shop/category/category.controller'

const router = Router()

router.get(ROUTES_NAME_SHOP.CATEGORY.CATEGORY_ALL, categoryController.getCategoryProductShop)

export default router;
