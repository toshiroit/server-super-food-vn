import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { toLowerCaseNonAccentVietnamese } from '../../../libs/nonAccentVietnamese';
import { CategoryData, CategoryRemove, GetCategoryProductByShop } from '../../../types/shop/category/category';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class CategoryModel extends Model {
  public static async checkNameCategoryShopModel(data: CategoryData) {
    return pool.query(SqlRoot.SQL_CHECK_NAME_CATEGORY_BY_SHOP(), [toLowerCaseNonAccentVietnamese(data.name_category), data.code_shop]);
  }

  public static async removeCategoryShopModel(data: CategoryRemove, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_REMOVE_CATEGORY_BY_SHOP(), [data.category_code, data.code_shop], callback);
  }

  public static async getCategoryProductShopModel(data: GetCategoryProductByShop, callback: CallbackHandler) {
    const dataSQL = [data.code_shop];
    pool.query(SqlRoot.SQL_GET_CATEGORY_PRODUCT_BY_SHOP(), dataSQL, callback);
  }

  public static async getAllCategoryByShopModel(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_CATEGORY_BY_SHOP(), [data.code_shop.trim()], callback);
  }

  public static async addNewCategoryByShopModel(data: CategoryData, callback: CallbackHandler) {
    const dataSQL = [data.category_code, data.name_category, data.image, data.info_category, data.status_category, data.code_shop];
    pool.query(SqlRoot.SQL_ADD_CATEGORY_BY_SHOP(), dataSQL, callback);
  }
  public static async updateCategoryByShopModel(data: CategoryData, callback: CallbackHandler) {
    const dataSQL = [data.category_code, data.code_shop, data.name_category, data.image, data.info_category, data.status_category];

    pool.query(SqlRoot.SQL_UPDATE_CATEGORY_BY_SHOP(), dataSQL, callback);
  }
}
