import { Router } from "express";
import * as searchController from './../../../controllers/search/search.controller'
const router = Router()

router.get('', searchController.searchProductByType)

export default router;
