import pool from "../../database";
import { CallbackHandler } from "../../interfaces/model_query/modelQuery";
import { getPagination } from "../../libs/getPagination";
import { DataGetOrdeDetailByUser, OrderGetByUserData } from "../../types/order/order";
import Model from "../Model";
import SqlRoot from "../sql";

export class OrderModel extends Model {
  public static async getOrderByUserModel(data: OrderGetByUserData, callback: CallbackHandler) {
    const dataSQL = [data.codeUser]

    const { limit, offset } = getPagination(Number(data.page || 0) === 0 ? 1 : Number(data.page))
    let queryOrder = ''
    if (limit !== null && offset !== null) {
      queryOrder += ` LIMIT ${limit} OFFSET ${offset}`
    }
    const queryResult = SqlRoot.SQL_GET_ORDER_BY_USER() + queryOrder
    pool.query(queryResult, dataSQL, callback)
  }
  public static async getCountOrderByUserModel(data: OrderGetByUserData) {
    const dataSQL = [data.codeUser]
    return pool.query(SqlRoot.SQL_GET_COUNT_ORDER_BY_USER(), dataSQL)
  }

  public static async getOrderDetailByUser(data: DataGetOrdeDetailByUser, callback: CallbackHandler) {
    const dataResult = [data.code_user, data.code_order]
    pool.query(SqlRoot.SQL_GET_ORDER_DETAIL_BY_USER(), dataResult, callback)
  }
}
