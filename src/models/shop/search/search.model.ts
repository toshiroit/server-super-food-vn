import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class SearchModel extends Model {
  public static async getShopModelByNameAndCode(data: { name_shop: string; code_shop: string }, callback: CallbackHandler) {
    let sql_result = SqlRoot.SQL_GET_SHOP_BY_NAME_OR_CODE();
    console.log('DATA : ', data.name_shop, '---', data.code_shop);
    sql_result += ` where
	      converttvkdau(s.name_shop) ilike '%${data.name_shop}%' OR s.code_shop='${data.code_shop}'`;
    pool.query(sql_result, [], callback);
  }

  public static async getCountShopModelByNameAndCode(data: { name_shop: string; code_shop: string }) {
    let sql_result = SqlRoot.SQL_GET_COUNT_SHOP_NAME_PRODUCT_BY_TEXT();
    sql_result += ` where
	      converttvkdau(s.name_shop) ilike '%${data.name_shop}%' OR s.code_shop='${data.code_shop}'`;
    return pool.query(sql_result, []);
  }
}
