import config from '../../../config/config';
import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { getPagination } from '../../../libs/getPagination';
import { makeId } from '../../../libs/make_id';
import { toLowerCaseNonAccentVietnamese } from '../../../libs/nonAccentVietnamese';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class InfoShopModel extends Model {
  public static async getDetailShopInfoByCodeShop(data: { code_shop: string; code_user: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_DETAIL_SHOP(), [data.code_shop.trim(), data.code_user ? data.code_user.trim() : null], callback);
  }

  public static async getCountAllProductShopModel(data: { code_shop: string; q?: string }) {
    const dataResult = [data.code_shop];
    let querySearch = '';
    if (data.q) {
      querySearch += ` AND converttvkdau(p.name) ilike '%${toLowerCaseNonAccentVietnamese(data.q)}%' `;
      querySearch += ` OR p.code_product='${data.q}' `;
    }
    const queryResult = SqlRoot.SQL_GET_COUNT_PRODUCT_BY_SHOP() + querySearch;
    return pool.query(queryResult, dataResult);
  }

  public static async getAllCategoryProductShopModel(data: { code_shop: string; q?: string; type?: 'top-pay' | 'new' }) {
    let querySearch = '';
    if (data.q) {
      querySearch += ` AND converttvkdau(p.name) ilike '%${toLowerCaseNonAccentVietnamese(data.q)}%' `;
      querySearch += ` OR p.code_product='${data.q}' `;
    }
    if (data.type) {
      if (data.type === 'top-pay') {
        querySearch += ' ORDER BY pd.purchase DESC ';
      } else if (data.type === 'new') {
        querySearch += ' ORDER BY pd."createdAt" DESC ';
      } else {
        querySearch += ' ';
      }
    }
    const queryResult = SqlRoot.SQL_GET_ALL_CATEGORY_BY_PRODUCT_SHOP() + querySearch;
    return pool.query(queryResult, [data.code_shop]);
  }
  public static async getAllProductShopModel(data: { code_shop: string; page: number; type?: string; q?: string }, callback: CallbackHandler) {
    let querySearch = '';
    const { offset, limit } = getPagination(data.page, 20);
    if (data.q) {
      querySearch += ` AND converttvkdau(p.name) ilike '%${toLowerCaseNonAccentVietnamese(data.q)}%' `;
      querySearch += ` OR p.code_product='${data.q}' `;
    }
    if (data.type) {
      if (data.type === 'top-pay') {
        querySearch += ' ORDER BY pd.purchase DESC ';
      } else if (data.type === 'new') {
        querySearch += ' ORDER BY pd."createdAt" DESC ';
      } else {
        querySearch += ' ';
      }
    }
    const dataResult = [data.code_shop];
    querySearch += ` LIMIT 20 OFFSET ${offset} `;
    const queryResult = SqlRoot.SQL_GET_PRODUCT_BY_SHOP() + querySearch;
    pool.query(queryResult, dataResult, callback);
  }

  public static async getAllCategoryProductShopModel2(data: { code_shop: string }) {
    return pool.query(SqlRoot.SQL_GET_ALL_CATEGORY_PRODUCT_BY_SHOP(), [data.code_shop]);
  }

  public static async followShopByUserModel(data: { code_shop: string; code_user: string }, callback: CallbackHandler) {
    const sqlFollow = `
    INSERT INTO follow_shop_sp(
	    code_follow, code_user, code_shop
    )
	  SELECT '${makeId(15)}','${data.code_user.trim()}','${data.code_shop.trim()}'
		  WHERE NOT EXISTS(
		  SELECT code_follow,code_user,code_shop
		  FROM follow_shop_sp
		  WHERE follow_shop_sp.code_user='${data.code_user.trim()}' and follow_shop_sp.code_shop='${data.code_shop.trim()}'
    )
    `;
    pool.query(sqlFollow, [], callback);
  }

  public static async disableFollowShopByUserModel(data: { code_shop: string; code_user: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_DISABLE_FOLLOW_SHOP_BY_USER(), [data.code_user, data.code_shop], callback);
  }

  public static async getAllCategoryShopModel(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_CATEGORY_BY_SHOP(), [data.code_shop], callback);
  }
}
