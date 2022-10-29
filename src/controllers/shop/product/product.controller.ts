import { Request, Response } from "express";
import config from "../../../config/config";
import { getPagingData } from "../../../libs/getPagination";
import { getDataUser } from "../../../libs/getUserToken";
import { ProductShopModel } from "../../../models/shop/product/product.model";

export const getAllProductShop = async (req: Request, res: Response) => {
  try {
    const { page } = req.query
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const code_shop = data_user?.payload.code_shop as string || ''
    const dataCountProductShop = await ProductShopModel.getCountAllProductShopModel({ code_shop: code_shop })
    console.log("COUNT : ", dataCountProductShop.rows)
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
