import { Router } from "express";
import { ROUTES_NAME } from "../../../constants/routes_name";
import * as productController from "../../../controllers/product/product.controller";
const routes = Router()

routes.get(ROUTES_NAME.PRODUCT.GET_ALL_PRODUCTS, productController.productGetAll);
routes.get(ROUTES_NAME.PRODUCT.GET_PRODUCT_BY_NAME_OR_CODE, productController.productGetByNameOrCode)

export default routes;
