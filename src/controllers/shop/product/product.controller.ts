import { Request, Response } from "express";
import config from "../../../config/config";
import { getPagingData } from "../../../libs/getPagination";
import { getDataUser } from "../../../libs/getUserToken";
import { makeId } from "../../../libs/make_id";
import { ProductShopModel } from "../../../models/shop/product/product.model";
import { AddProductShop, GetProductByCodeAndShop } from "../../../schemas/shop/product/product.schema";
import * as TypeProduct from '../../../types/shop/product/product'

const dataUser = (req: Request) => {
  const { cookie } = req.headers
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer)
  return data_user;
}
export const getAllProductShop = async (req: Request, res: Response) => {
  try {
    const { page } = req.query
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const code_shop = data_user?.payload.code_shop as string || ''
    const dataCountProductShop = await ProductShopModel.getCountAllProductShopModel({ code_shop: code_shop })
    await ProductShopModel.getAllProductShopModel({ code_shop: code_shop, page: Number(page) || 1 }, (err, result) => {
      if (err) {
        res.json({
          err: "Error"
        })
      }
      else {
        if (result) {
          const dataPaging = {
            count: Number(dataCountProductShop.rows[0].count) || 0,
            rows: result.rows
          }
          const { tutorials, totalItems, totalPages, currentPage } =
            getPagingData(dataPaging, Number(page) || 0, Number(config.table_product_shop_limit_show) || 10)
          res.json({
            totalPages,
            totalItems,
            limit: Number(config.table_product_shop_limit_show),
            currentPage,
            data: tutorials
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

export const addProductShop = async (req: Request<any, null, AddProductShop>, res: Response) => {
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const dataAddProductSQL = [
      makeId(15),
      data_user?.payload.code_shop,
      req.body.image,
      req.body.name_product,
      req.body.price,
      req.body.quantity,
      0,
      makeId(15),
      0,
      req.body.discount,
      makeId(15),
      new Date(Date.now()).toISOString(),
      JSON.stringify(req.body.type_product),
      null,
      req.body.date_start || null,
      req.body.date_end || null,
      req.body.isShow,
      req.body.description,
      req.body.guide,
      req.body.return,
      req.body.note,
    ]
    await ProductShopModel.addProductShopModel(dataAddProductSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            data: result,
            message: 'Đăng sản phẩm thành công'
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
export const getProductByCodeAndShop = async (req: Request<any, any, any, GetProductByCodeAndShop>, res: Response) => {
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const dataQuery: TypeProduct.GetProductByCodeAndShop = {
      code_product: req.query.code_product,
      code_shop: data_user?.payload.code_shop
    }
    await ProductShopModel.getProductByCodeAndShopModel(dataQuery, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            message: 'success',
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
