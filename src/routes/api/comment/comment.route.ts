import { Router } from "express";
import * as commentController from '../../../controllers/comment/comment.controller'
import { ROUTES_NAME } from "../../../constants/routes_name";

const router = Router()

router.post(ROUTES_NAME.COMMENT.ADD_NEW_COMMENT, (req, res) => {
  res.json({
    message: "ADD NEW COMMENt"
  })
})

router.get(ROUTES_NAME.COMMENT.GET_COMMENT, commentController.getAllCommentByProduct)
export default router;
