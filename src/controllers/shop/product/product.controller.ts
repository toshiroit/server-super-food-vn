import { Request, Response } from "express";
import config from "../../../config/config";
import { getPagingData } from "../../../libs/getPagination";
import { getDataUser } from "../../../libs/getUserToken";
import { makeId } from "../../../libs/make_id";
import { ProductModel } from "../../../models/product/product.model";
import { ProductShopModel } from "../../../models/shop/product/product.model";
import { AddProductShop, GetProductByCodeAndShop } from "../../../schemas/shop/product/product.schema";
import { TypeGetProductWP } from "../../../types/product/product.type";
import * as TypeProduct from '../../../types/shop/product/product'

export const dataUserTK = (req: Request) => {
  const { cookie } = req.headers
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer)
  return data_user;
}

export const getAllProductShop = async (req: Request, res: Response) => {
  try {
    const { page, type } = req.query
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const code_shop = data_user?.payload.code_shop as string || ''
    const dataCountProductShop = await ProductShopModel.getCountAllProductShopModel({ code_shop: code_shop })
    await ProductShopModel.getAllProductShopModel({ code_shop: code_shop, page: Number(page) || 1, type: type as string || '' }, (err, result) => {
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
      req.body.code_product_type,
      0,
      req.body.discount,
      makeId(15),
      new Date(Date.now()).toISOString(),
      JSON.stringify(req.body.type_product),
      null,
      req.body.date_start || null,
      req.body.date_end || null,
      req.body.isShow,
      JSON.stringify(req.body.images),
      req.body.free_ship === 1 ? false : true,
      req.body.description,
      req.body.guide,
      req.body.return,
      req.body.note,
    ]
    console.log(dataAddProductSQL)
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

export const getAllProductType = async (req: Request, res: Response) => {
  try {
    const dataUser = dataUserTK(req)
    if (dataUser) {
      const code_shop = dataUser.payload.code_shop
      await ProductModel.getAllTypeProductByShopModel({ code_shop: code_shop }, (err, result) => {
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
    }
  } catch (err) {
    res.json({
      error: err
    })
  }
}

export const removeProductByShop = async (req: Request, res: Response) => {
  try {
    const { code_product } = req.query
    const dataUser = dataUserTK(req)
    const code_shop = dataUser?.payload.code_shop
    if (code_product) {
      await ProductShopModel.removeProductByShop({
        code_product: code_product as string,
        code_shop: code_shop
      }, (err, result) => {
        if (err) {
          res.json({
            error: err
          })
        }
        else {
          if (result) {
            if (result.rowCount === 1) {
              res.json({
                success: true,
                message: 'Xóa dữ liệu thành công '
              })
            }
            else {
              res.json({
                success: false,
                message: 'Xóa dữ liệu không thành công '
              })
            }
          }
        }
      })
    }
  } catch (err) {
    res.json({
      error: err
    })
  }
}

export const addTypeProductByShop = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const dataUser = dataUserTK(req)
    const dataSQL: TypeProduct.AddTypeProductByShop = {
      code_product_type: makeId(15),
      name_product_type: data.name_product_type,
      status: data.status,
      code_shop: dataUser?.payload.code_shop
    }
    console.log(dataSQL)
    await ProductShopModel.addTypeProductModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            data: result
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
