import { Router } from "express";
import authAdmin from './api-admin/auth/auth.route'
const router = Router()
router.use('/auth', authAdmin)

export default router;


