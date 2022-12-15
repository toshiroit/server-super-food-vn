import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { NotifyTypeGet } from '../../../types/notify/notify';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class NotifyShopModel extends Model {
  public static async getAllNotifyByShopModel(data: { code_shop: string; limit: number; type: number }, callback: CallbackHandler) {
    let sql_result = SqlRoot.SQL_GET_ALL_NOTIFY_SHOP();
    if (data.type === 1) {
      sql_result += ` AND type=${data.type} `;
    } else if (data.type === 2) {
      sql_result += ` AND type=${data.type} `;
    }
    sql_result += ` LIMIT ($2) `;
    pool.query(sql_result, [data.code_shop, data.limit], callback);
  }
  public static async getDetailNotifyByShopModel(data: { code_notify: string; code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_DETAIL_NOTIFY_SHOP(), [data.code_shop, data.code_notify], callback);
  }
}
