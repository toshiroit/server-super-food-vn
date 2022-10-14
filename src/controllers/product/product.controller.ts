import { Request, Response } from "express";
import { ProductModel } from "../../models/product/product.model";
import { GetProductDetailTp } from "../../types/product/product.type";

export const productGetAll = async (req: Request, res: Response) => {
  try {
    await ProductModel.getAllProductModel((err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (!result?.rows || result.rows.length <= 0) {
          res.json({
            message: "Không có sản phẩm"
          })
        }
        res.json({
          quality: result?.rows.length,
          data: result?.rows
        })
      }
    })
  } catch (err) {

  }
}
export const productGetByNameOrCode = async (req: Request, res: Response) => {
  const data: GetProductDetailTp = {
    code: req.query.code as string || null,
    name: req.query.name as string || null
  }
  try {
    await ProductModel.getProductDetailModel(data, (err, result) => {
      if (err) {
        res.json({
          message: err
        })
      }
      else {
        if (result) {
          if (result.rowCount > 0) {
            res.status(200).json({
              rowcount: result.rowCount,
              data: result
            })
          }
          else if (result.rowCount <= 0) {
            res.status(200).json({
              message: 'Không có sản phẩm '
            })
          }
        }
        else {
          res.json({
            error: "NOT DATA"
          })
        }
      }
    })
  } catch (err) {

  }
}
