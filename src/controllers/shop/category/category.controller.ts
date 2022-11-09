import { Request, Response } from "express";
import { getDataUser } from "../../../libs/getUserToken";
import { CategoryModel } from "../../../models/shop/category/category.model";
import { GetCategoryProductByShop } from "../../../types/shop/category/category";

export const getCategoryProductShop = async (req: Request, res: Response) => {
  try {
    const { page } = req.query
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const dataSQL: GetCategoryProductByShop = {
      code_shop: data_user?.payload.code_shop as string || '',
      page: page as string,
      limit: ''
    }
    await CategoryModel.getCategoryProductShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          const dataPaging = {
            count: 0,
            rows: result.rows
          }
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
export const getAllCategoryByShop = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const code_shop = data_user?.payload.code_shop as string || ''
    await CategoryModel.getAllCategoryByShopModel({ code_shop: code_shop }, (err, result) => {
      if (err)
        res.json({
          error: err
        })
      else
        if (result)
          res.json({
            data: result.rows
          })
    })
  } catch (err) {
    res.json({
      error: "ERROR"
    })
  }
}
