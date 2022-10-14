import { Request, Response } from "express";
import { CommentModel } from "../../models/comment/comment.model";

export const addNewComment = (req: Request, res: Response) => {
  try {
    const data = req.body
  } catch (err) {
    res.json({
      error: err
    })
  }
}

export const getAllCommentByProduct = async (req: Request, res: Response) => {
  try {
    await CommentModel.getAllCommentByProductModel(req.query.code_product as string, (err, result) => {
      if (err) {
        res.json({
          message: err
        })
      }
      else {
        if (!result?.rows) {
          res.json({
            message: "Bị lỗi "
          })
        }
        else {
          if (result.rowCount <= 0) {
            res.json({
              message: "Không có bình luận - đánh giá nào "
            })
          }
          else if (result.rowCount > 0) {
            res.json({
              data: result
            })
          }
          else {
            res.json({
              error: "Error"
            })
          }
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}
