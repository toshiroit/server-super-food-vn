import pool from "../../../database";
import { CallbackHandler } from "../../../interfaces/model_query/modelQuery";
import { HideOrderByShopTp, RemoveOrderByShopTp } from "../../../types/shop/order/order";
import Model from "../../Model";
import SqlRoot from "../../sql";

export class OrderModel extends Model {

  public static async getAllOrderByShop(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_ORDER_BY_SHOP(), [data.code_shop], callback)
  }

  public static async getAllProductByOrderAndShop(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_PRODUCT_BY_ORDER_AND_SHOP(), [data.code_shop], callback)
  }

  public static async hideOrderByShop(data: HideOrderByShopTp, callback: CallbackHandler) {
    const dataSQL = [data.is_show, data.code_shop, data.code_order]
    pool.query(SqlRoot.SQL_HIDE_ORDER_BY_SHOP(), [dataSQL], callback)
  }

  public static async removeOrderByShopModel(data: RemoveOrderByShopTp, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_REMOVE_ORDER_SHOP(), [data.code_shop, data.code_order], callback)
  }
}
