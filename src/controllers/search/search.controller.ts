import { Request, Response } from "express";
import config from "../../config/config";
import { getPagingData } from "../../libs/getPagination";
import { ProductModel } from "../../models/product/product.model";
import { SearchProductByQuery } from "../../types/search/search";

export const searchProductByType = async (req: Request<null, null, null, SearchProductByQuery>, res: Response) => {
  try {
    const dataQuery = {
      q: req.query.q,
      typeShow: req.query.typeShow,
      listShop: req.query.listShop,
      sort: req.query.sort,
      page: req.query.page,
      size: req.query.size,
    }

    const dataCount = await ProductModel.getCountProduct(dataQuery)
    console.log("count : ", dataCount.rows[0].count)
    await ProductModel.getProductByQueryModel(dataQuery, (err, result) => {
      if (err) {
        res.json({
          error: "Error"
        })
      }
      else {

        if (result) {
          const dataPaging = {
            count: Number(dataCount.rows[0].count) || 0,
            rows: result.rows
          }
          const { tutorials, totalItems, totalPages, currentPage } =
            getPagingData(dataPaging, Number(dataQuery.page) || 0, Number(config.search_product_limit_show) || 30)
          res.json({
            totalItems,
            totalPages,
            currentPage,
            limit: Number(config.search_product_limit_show),
            data: tutorials,
          })
        }
      }
    })

  } catch (error) {
    res.json({
      error: "Error "
    })
  }
}
