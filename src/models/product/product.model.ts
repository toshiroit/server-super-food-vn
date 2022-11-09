import config from "../../config/config";
import pool from "../../database";
import { CallbackHandler } from "../../interfaces/model_query/modelQuery";
import { getPagination } from "../../libs/getPagination";
import { toLowerCaseNonAccentVietnamese } from "../../libs/nonAccentVietnamese";
import { GetAllProductShop, GetAllProductTp, GetProductDetailTp } from "../../types/product/product.type";
import { SearchProductByQuery } from "../../types/search/search";
import Model from "../Model";
import SqlRoot from "../sql";

export class ProductModel extends Model {

  /*
   * @params {data} data code and name
   */
  public static async getAllProductModel(data: GetAllProductTp, callback: CallbackHandler) {
    let queryGetProduct = ''
    if (data) {
      if (data.typeSort === 'new-product') {
        queryGetProduct += ` ORDER BY pd."createdAt" DESC `
      }
      else if (data.typeSort === 'shop-new') {
        queryGetProduct += ``
      }
      else if (data.typeSort === 'pay-top') {
        queryGetProduct += ` ORDER BY pd.purchase DESC `
      }
      else if (data.typeSort === 'evaluate') {
        queryGetProduct += ` ORDER BY p.evaluate `
      }

    }
    if (data.limit != null) {
      queryGetProduct += ` LIMIT ${data.limit} `
    }
    const sqlResult = SqlRoot.SQL_GET_PRODUCT_ALL() + queryGetProduct;
    pool.query(sqlResult, callback);
  }
  public static async getProductDetailModel(data: GetProductDetailTp, callback: CallbackHandler) {
    const dataGet = [data.code, `%${data.name}%`]
    pool.query(SqlRoot.SQL_GET_PRODUCT_BY_NAME_OR_CODE(), dataGet, callback)
  }


  public static async getCountProduct(data: SearchProductByQuery) {
    let queryCount = ''
    const dataQ = []
    if (data.q) {
      queryCount += ' where p.name like ($1) '
      dataQ.push(`%${data.q}%`)
    }

    const resultSQL = SqlRoot.SQL_GET_COUNT_PRODUCT() + queryCount
    return pool.query(resultSQL, dataQ)
  }

  public static async getAllProductByShopModel(data: GetAllProductShop, callback: CallbackHandler) {
    let querySearch = ''
    const dataQuery = [data.code_shop]
    if (data.limit) {
      querySearch += ` LIMIT ${data.limit}`
    }
    const queryResult = SqlRoot.SQL_GET_PRODUCT_BY_SHOP() + querySearch
    pool.query(queryResult, dataQuery, callback)
  }

  public static async getAllProductByTopModel(data: { limit: string }, callback: CallbackHandler) {
    let querySearch = ''
    if (data.limit) {
      querySearch += ` LIMIT ${data.limit}`
    }
    const queryResult = SqlRoot.SQL_GET_PRODUCT_BY_TOP() + querySearch
    pool.query(queryResult, callback)
  }

  public static async getAllProductByPayTop(data: { limit: string }, callback: CallbackHandler) {
    let querySearch = ''
    if (data.limit) {
      querySearch += ` LIMIT ${data.limit}`
    }
    const queryResult = SqlRoot.SQL_GET_PRODUCT_BY_PAY_TOP() + querySearch
    pool.query(queryResult, callback)
  }
  public static async getProductByQueryModel(data: SearchProductByQuery, callback: CallbackHandler) {
    const { limit, offset } = getPagination(Number(data.page || 1), Number(config.search_product_limit_show))
    let querySearch = ''
    const dataSql = []
    querySearch += ' where '

    if (data.q) {
      querySearch += ' convertTVkdau(p.name) ilike ($1) '
      dataSql.push(`%${toLowerCaseNonAccentVietnamese(data.q)}%`)
    }
    if (data.sort) {
      if (data.sort.trim() === '0') {
        querySearch += ' ORDER BY p.name ASC '
      }
      else if (data.sort.trim() === '1') {
        querySearch += ' ORDER BY p.name DESC '
      }
    }

    if (limit !== null && offset !== null) {
      querySearch += ` LIMIT ${limit} OFFSET ${offset}`
    }

    const queryResult = SqlRoot.SQL_GET_PRODUCT_BY_QUERY() + querySearch
    //queryResult = queryResult
    return pool.query(queryResult, dataSql, callback)
  }

}
