import pool from '../../database';
import { CallbackHandler } from '../../interfaces/model_query/modelQuery';
import { toLowerCaseNonAccentVietnamese } from '../../libs/nonAccentVietnamese';
import Model from '../Model';
import SqlRoot from '../sql';

export class SearchModel extends Model {
  public static async getListTextSearchProduct(data: { text: string }) {
    let sqlResult = SqlRoot.SQL_GET_NAME_PRODUCT_BY_TEXT();
    sqlResult += ` where converttvkdau(p.name) ilike '%${toLowerCaseNonAccentVietnamese(data.text)}%' ORDER BY p.evaluate DESC LIMIT 7 `;
    return pool.query(sqlResult, []);
  }
}
