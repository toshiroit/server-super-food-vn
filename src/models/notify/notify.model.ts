import pool from '../../database';
import { CallbackHandler } from '../../interfaces/model_query/modelQuery';
import { timeVietNameFullTime } from '../../libs/timeVietNam';
import { NotifyType } from '../../types/notify/notify';
import Model from '../Model';
import SqlRoot from '../sql';

export class NotifyModel extends Model {
  public static async addNewNotifyShopModel(data: NotifyType, callback: CallbackHandler) {
    pool.query(
      SqlRoot.SQL_INSERT_NOTIFY_SHOP(),
      [data.code_notify_shop, data.code_shop, data.title, data.info, data.code_type_notify, data.createdAt],
      callback
    );
  }

  public static async addNewNotifyByUser(data: NotifyType, callback: CallbackHandler) {
    const dataSQL = [data.code_notify_shop, data.code_user, data.title, data.info, timeVietNameFullTime()];
    pool.query(SqlRoot.SQL_INSERT_NOTIFY_BY_USER(), dataSQL, callback);
  }

  public static async getAllNotifyUser(data: { code_user: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_NOTIFY_USER(), [data.code_user], callback);
  }
}
