import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { toLowerCaseNonAccentVietnamese } from '../../../libs/nonAccentVietnamese';
import { VoucherDataAddNew, VoucherDataFilter } from '../../../types/voucher/voucher';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class VoucherModel extends Model {
  public static async getAllVoucherModel(data: { code_shop: string; data_filter: VoucherDataFilter }, callback: CallbackHandler) {
    let sql_result = SqlRoot.SQL_GET_ALL_VOUCHER_BY_SHOP();
    console.log(data.data_filter);
    if (data.data_filter) {
      if (
        data.data_filter.name_voucher &&
        data.data_filter.name_voucher !== 'null' &&
        data.data_filter.name_voucher !== 'undefined' &&
        data.data_filter.name_voucher.length > 0
      ) {
        sql_result += ` and converttvkdau(v.name_voucher) ilike '%${toLowerCaseNonAccentVietnamese(data.data_filter.name_voucher)}%' `;
      }
      if (
        data.data_filter.time_start &&
        data.data_filter.time_end &&
        data.data_filter.time_start !== 'null' &&
        data.data_filter.time_end !== 'null' &&
        data.data_filter.time_start !== 'undefined' &&
        data.data_filter.time_end !== 'undefined'
      ) {
        sql_result += ` and v.time_start BETWEEN '${data.data_filter.time_start}' and '${data.data_filter.time_end}'  `;
      }
    }
    console.log(sql_result);
    pool.query(sql_result, [data.code_shop], callback);
  }

  public static async addNewVoucherModel(data: VoucherDataAddNew, callback: CallbackHandler) {
    const dataSQL = [
      data.code_voucher,
      data.name_voucher,
      data.price_voucher,
      data.code_type_voucher,
      data.description,
      data.code_w_voucher,
      data.time_start,
      data.time_end,
      data.createdat,
      data.quality,
      data.code_shop,
      JSON.stringify(data.code_product),
      data.type_price === 'price' ? 1 : 2,
    ];
    pool.query(SqlRoot.SQL_ADD_NEW_VOUCHER_BY_SHOP(), dataSQL, callback);
  }
}
