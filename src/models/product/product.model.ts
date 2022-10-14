import pool from "../../database";
import { CallbackHandler } from "../../interfaces/model_query/modelQuery";
import { GetProductDetailTp } from "../../types/product/product.type";
import Model from "../Model";
import SqlRoot from "../sql";

export class ProductModel extends Model {

  /*
   * @params {data} data code and name
   */
  public static async getAllProductModel(callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_PRODUCT_ALL(), callback);
  }
  public static async getProductDetailModel(data: GetProductDetailTp, callback: CallbackHandler) {
    const dataGet = [data.code, `%${data.name}%`]
    pool.query(SqlRoot.SQL_GET_PRODUCT_BY_NAME_OR_CODE(), dataGet, callback)
  }

}
