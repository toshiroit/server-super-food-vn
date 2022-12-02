import { validateTokenMiddleware } from './../../../middlewares/auth/auth.middleware';
import { ROUTES_NAME } from './../../../constants/routes_name';
import * as evaluateController from './../../../controllers/evaluate/evaluate.controller';
import { Router } from 'express';
import { validateResource } from '../../../middlewares/validateResource';
import { addEvaluateByProductSchema } from '../../../schemas/evaluate/evaluate.schema';

const router = Router();

router.post(ROUTES_NAME.EVALUATE.ADD_EVALUATE, validateTokenMiddleware, validateResource(addEvaluateByProductSchema), evaluateController.addEvaluateByProduct);
router.get(ROUTES_NAME.EVALUATE.CHECK_EVALUATE, validateTokenMiddleware, evaluateController.checkEvaluateByProductUserOrder);
router.get(ROUTES_NAME.EVALUATE.GET_EVALUATE, evaluateController.getEvaluateByProduct);
export default router;
