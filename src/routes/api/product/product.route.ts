import { Router } from "express";
import { ROUTES_NAME } from "../../../constants/routes_name";
import * as productController from "../../../controllers/product/product.controller";
const router = Router()

router.get(ROUTES_NAME.PRODUCT.GET_ALL_PRODUCTS, productController.productGetAll);
router.get(ROUTES_NAME.PRODUCT.GET_PRODUCT_BY_NAME_OR_CODE, productController.productGetByNameOrCode)
router.get(ROUTES_NAME.PRODUCT.GET_ALL_PRODUCT_SHOP, productController.getAllProductByShop)
router.get(ROUTES_NAME.PRODUCT.GET_ALL_PRODUCT_TOP, productController.getAllProductByTop)
router.get(ROUTES_NAME.PRODUCT.GET_ALL_PRODUCT_PAY_TOP, productController.getAllProductByPayTop)
export default router;
