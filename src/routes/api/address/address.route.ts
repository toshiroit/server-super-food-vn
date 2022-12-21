import { Router } from 'express';
import { ROUTES_NAME } from '../../../constants/routes_name';
import * as addressController from '../../../controllers/address/address.controller';
import { validateTokenMiddleware } from '../../../middlewares/auth/auth.middleware';
const router = Router();

router.get(ROUTES_NAME.ADDRESS.GET_ADDRESS, validateTokenMiddleware, addressController.getAddressByUser);
router.post(ROUTES_NAME.ADDRESS.ADD_ADDRESS, validateTokenMiddleware, addressController.addAddressByUser);
router.get(ROUTES_NAME.ADDRESS.DETAIL_ADDRESS, validateTokenMiddleware, addressController.getDetailAddressUserByCode);
router.put(ROUTES_NAME.ADDRESS.UPDATE_ADDRESS_USER_BY_CODE, validateTokenMiddleware, addressController.updateAddressUserByCode);
router.delete(ROUTES_NAME.ADDRESS.REMOVE_ADDRESS_USER_BY_CODE, validateTokenMiddleware, addressController.removeAddressUserByCode);
export default router;
