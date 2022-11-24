import pool from "../../database";
import { CallbackHandler } from "../../interfaces/model_query/modelQuery";
import { NotifyType } from "../../types/notify/notify";
import Model from "../Model";
import SqlRoot from "../sql";

export class notifyModel extends Model {

  public static async addNewNotifyShopModel(data: NotifyType, callback: CallbackHandler) {
    pool.query(
      SqlRoot.SQL_INSERT_NOTIFY_SHOP(),
      [data.code_notify_shop, data.code_shop, data.title, data.info, data.code_type_notify, data.createdAt],
      callback)
  }
}
