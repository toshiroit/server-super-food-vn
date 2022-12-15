import pool from '../../database';
import { CallbackHandler } from '../../interfaces/model_query/modelQuery';
import { VoucherDataCheck } from '../../types/voucher/voucher';
import SqlRoot from '../sql';

export class VoucherModel {
  public static async checkVoucherProductByVoucherShopModel(data: VoucherDataCheck, callback: CallbackHandler) {
    console.log('=> ', data.code_product);
    pool.query(SqlRoot.SQL_CHECK_VOUCHER_PRODUCT_BY_SHOP(JSON.stringify(data.code_product)), [data.code_voucher], callback);
  }
}
