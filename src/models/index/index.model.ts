import pool from '../../database';
import { CallbackHandler } from '../../interfaces/model_query/modelQuery';
import Model from '../Model';
import SqlRoot from '../sql';

export class IndexModel extends Model {
  public static async getAllIndexDataModel(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_DATA_HOME_STATISTICAL(), [data.code_shop], callback);
  }
}
