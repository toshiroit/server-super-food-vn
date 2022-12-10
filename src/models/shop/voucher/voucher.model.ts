import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class VoucherModel extends Model {
  public static async getAllVoucherModel(data: { code_shop: string }, callback: CallbackHandler) {
    console.log('code shop : ', data.code_shop);
    pool.query(SqlRoot.SQL_GET_ALL_VOUCHER_BY_SHOP(), [data.code_shop], callback);
  }
}
