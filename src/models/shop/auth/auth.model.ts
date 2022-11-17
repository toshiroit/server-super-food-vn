import pool from "../../../database";
import { CallbackHandler } from "../../../interfaces/model_query/modelQuery";
import Model from "../../Model";
import SqlRoot from "../../sql";

export class AuthModel extends Model {

  public static async authCheckUser(data: { user_name: string, phone: string }) {
    return pool.query(SqlRoot.SQL_CHECK_USER_REGISTER(), [data.user_name, data.phone])
  }
  public static async authRegisterModel(data: any, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_REGISTER_SHOP(), data, callback)
  }
}
