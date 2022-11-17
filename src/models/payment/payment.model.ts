import pool from "../../database";
import { CallbackHandler } from "../../interfaces/model_query/modelQuery";
import Model from "../Model";
import SqlRoot from "../sql";

export class PaymentModel extends Model {

  public static async getAllPayment(callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_PAYMENT(), callback)
  }

}
