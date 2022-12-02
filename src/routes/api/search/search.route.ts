import { ROUTES_NAME } from './../../../constants/routes_name';
import { Router } from 'express';
import * as searchController from './../../../controllers/search/search.controller';
import { getShopByNameAndCode } from '../../../controllers/shop/search/search.controller';
const router = Router();

router.get('', searchController.searchProductByType);
router.get(ROUTES_NAME.SEARCH.LIST_TEXT_SEARCH, searchController.listTextSearchProduct);
router.get(ROUTES_NAME.SEARCH.LIST_SHOP_NAME_OR_CODE, getShopByNameAndCode);
export default router;
