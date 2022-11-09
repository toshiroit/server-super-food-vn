import config from "../../../config/config";
import pool from "../../../database";
import { CallbackHandler } from "../../../interfaces/model_query/modelQuery";
import { getPagination } from "../../../libs/getPagination";
import { GetProductByCodeAndShop } from "../../../types/shop/product/product";
import Model from "../../Model";
import SqlRoot from "../../sql";

export class ProductShopModel extends Model {

  public static async getCountAllProductShopModel(data: { code_shop: string }) {
    const dataResult = [data.code_shop]
    return pool.query(SqlRoot.SQL_GET_COUNT_PRODUCT_BY_SHOP(), dataResult)

  }
  public static async getAllProductShopModel(data: { code_shop: string, page: number }, callback: CallbackHandler) {
    let querySearch = ''
    const { offset, limit } = getPagination(data.page, Number(config.table_product_shop_limit_show))

    const dataResult = [data.code_shop]
    querySearch += ` LIMIT ${Number(config.table_product_shop_limit_show) || 10} OFFSET ${offset} `
    const queryResult = SqlRoot.SQL_GET_PRODUCT_BY_SHOP() + querySearch
    pool.query(queryResult, dataResult, callback)
  }

  public static async addProductShopModel(data: any, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_ADD_PRODUCT_BY_SHOP(), data, callback)
  }

  public static async getProductByCodeAndShopModel(data: GetProductByCodeAndShop, callback: CallbackHandler) {
    const dataQuery = [data.code_shop, data.code_product]
    pool.query(SqlRoot.SQL_GET_PRODUCT_BY_CODE_AND_SHOP(), dataQuery, callback)
  }
}
