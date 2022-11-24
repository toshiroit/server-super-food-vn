import pool from "../../../database";
import { CallbackHandler } from "../../../interfaces/model_query/modelQuery";
import Model from "../../Model";
import SqlRoot from "../../sql";

export class NotifyShopModel extends Model {
  public static async getAllNotifyByShopModel(data: { code_shop: string, limit: number }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_NOTIFY_SHOP(), [data.code_shop, data.limit], callback)
  }
}
