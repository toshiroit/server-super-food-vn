import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class FollowModel extends Model {
  public static async getAllUserFollowByShop(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_USER_FOLLOW_BY_SHOP(), [data.code_shop], callback);
  }
}
