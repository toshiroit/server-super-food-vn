import { Request, Response } from "express";
import { getPagination } from "../../libs/getPagination";
import { ProductModel } from "../../models/product/product.model";
import { AddProductShop } from "../../schemas/shop/product/product.schema";
import { GetAllProductShop, GetAllProductTp, GetProductDetailTp } from "../../types/product/product.type";

export const productGetAll = async (req: Request, res: Response) => {
  const { limit, type } = req.query
  try {
    const dataQuery: GetAllProductTp = {
      limit: Number(limit) || 6,
      typeSort: type as string || ''
    }
    await ProductModel.getAllProductModel(dataQuery, (err, result) => {
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
          type: dataQuery.typeSort,
          data: result?.rows,

        })
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}
export const productGetByNameOrCode = async (req: Request, res: Response) => {
  const { page, size, title } = req.query
  const data: GetProductDetailTp = {
    code: req.query.code as string || null,
    name: req.query.name as string || null,
    page: page as string || null,
    size: size as string || null,
    title: title as string || null
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
    res.json({
      error: err

    })
  }

}

export const getAllProductByShop = async (req: Request, res: Response) => {
  try {
    const { limit, code_shop } = req.query
    const dataSQL: GetAllProductShop = {
      limit: limit as string || '6',
      code_shop: code_shop as string || ''
    }
    await ProductModel.getAllProductByShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            data: result.rows
          })
        }
      }
    })
  } catch (err) {
    res.json({
      error: "Error"
    })
  }
}
export const getAllProductByTop = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query
    await ProductModel.getAllProductByTopModel({ limit: limit as string }, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            data: result.rows
          })
        }
      }
    })
  } catch (err) {
    res.json({
      error: "Error"
    })
  }
}
export const getAllProductByPayTop = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query
    await ProductModel.getAllProductByPayTop({ limit: limit as string }, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            data: result.rows
          })
        }
      }
    })
  } catch (err) {
    res.json({
      error: "Error"
    })
  }
}
