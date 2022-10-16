import { Router } from 'express'
import { ROUTES_NAME } from '../../../constants/routes_name'
import * as cartController from '../../../controllers/cart/cart.controller'
import { validateTokenMiddleware } from '../../../middlewares/auth/auth.middleware'

const router = Router()

router.get(ROUTES_NAME.CART.GET_CART, validateTokenMiddleware, cartController.getCart)
router.post(ROUTES_NAME.CART.ADD_CART, validateTokenMiddleware, cartController.addCartByCodeUser)
router.delete(ROUTES_NAME.CART.REMOVE_CART, validateTokenMiddleware, cartController.removeCart)
export default router;
