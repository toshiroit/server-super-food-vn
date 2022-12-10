import { query } from 'express';
import config from '../../../config/config';
import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { getPagination } from '../../../libs/getPagination';
import { toLowerCaseNonAccentVietnamese } from '../../../libs/nonAccentVietnamese';
import { AddTypeProductByShop, GetProductByCodeAndShop } from '../../../types/shop/product/product';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class ProductShopModel extends Model {
  public static async getCountAllProductShopModel(data: { code_shop: string; q?: string }) {
    const dataResult = [data.code_shop];
    let sql_result = SqlRoot.SQL_GET_COUNT_PRODUCT_BY_SHOP();
    if (data.q) {
      sql_result += ` AND converttvkdau(p.name) ilike '%${toLowerCaseNonAccentVietnamese(data.q)}%'  OR p.code_product='${data.q}' `;
    }
    return pool.query(sql_result, dataResult);
  }
  public static async getAllProductShopModel(data: { code_shop: string; page: number; type?: string; q?: string }, callback: CallbackHandler) {
    let querySearch = '';
    const { offset, limit } = getPagination(data.page, Number(config.table_product_shop_limit_show));
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
    querySearch += ` LIMIT ${Number(config.table_product_shop_limit_show) || 10} OFFSET ${offset} `;
    const queryResult = SqlRoot.SQL_GET_PRODUCT_BY_SHOP() + querySearch;
    pool.query(queryResult, dataResult, callback);
  }

  public static async addProductShopModel(data: any, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_ADD_PRODUCT_BY_SHOP(), data, callback);
  }

  public static async getProductByCodeAndShopModel(data: GetProductByCodeAndShop, callback: CallbackHandler) {
    const dataQuery = [data.code_shop, data.code_product];
    pool.query(SqlRoot.SQL_GET_PRODUCT_BY_CODE_AND_SHOP(), dataQuery, callback);
  }

  public static async addTypeProductModel(data: AddTypeProductByShop, callback: CallbackHandler) {
    const dataSQL = [data.code_product_type, data.name_product_type, data.status, data.code_shop];
    pool.query(SqlRoot.SQL_ADD_TYPE_PRODUCT(), dataSQL, callback);
  }

  public static async removeProductByShop(data: { code_product: string; code_shop: string }, callback: CallbackHandler) {
    const dataSQL = [data.code_product, data.code_shop];
    pool.query(SqlRoot.SQL_REMOVE_PRODUCT_BY_SHOP(), dataSQL, callback);
  }

  public static async searchProductByValueAndShop(data: { code_shop: string; value: string }, callback: CallbackHandler) {
    const dataSQL = [data.code_shop, data.value];
    pool.query(SqlRoot.SQL_SEARCH_PRODUCT_BY_SHOP(), dataSQL, callback);
  }

  public static async getCountSearchByValueAndShop(data: { code_shop: string; value: string }) {
    const dataSQL = [data.code_shop, data.value];
    return pool.query(SqlRoot.SQL_GET_COUNT_SEARCH_PRODUCT_BY_SHOP(), dataSQL);
  }

  public static async updateProductByCodeAndShop(data: any, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_UPDATE_PRODUCT_BY_CODE_AND_SHOP(), data, callback);
  }
}
