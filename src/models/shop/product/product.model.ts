import config from "../../../config/config";
import pool from "../../../database";
import { CallbackHandler } from "../../../interfaces/model_query/modelQuery";
import { getPagination } from "../../../libs/getPagination";
import Model from "../../Model";
import SqlRoot from "../../sql";

export class ProductShopModel extends Model {

  public static async getCountAllProductShopModel(data: { code_shop: string }) {
    const dataResult = [data.code_shop]
    return pool.query(SqlRoot.SQL_GET_COUNT_PRODUCT_BY_SHOP(), dataResult)

  }

  public static async getAllProductShopModel(data: { code_shop: string, page: number }, callback: CallbackHandler) {
    let querySearch = ''
    const { offset, limit } = getPagination(data.page)
    const dataResult = [data.code_shop]
    querySearch += ` LIMIT ${Number(config.table_product_shop_limit_show) || 10} OFFSET ${offset} `
    const queryResult = SqlRoot.SQL_GET_PRODUCT_BY_SHOP() + querySearch
    pool.query(queryResult, dataResult, callback)
  }
}
