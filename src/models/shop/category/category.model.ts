import pool from "../../../database";
import { CallbackHandler } from "../../../interfaces/model_query/modelQuery";
import { GetCategoryProductByShop } from "../../../types/shop/category/category";
import Model from "../../Model";
import SqlRoot from "../../sql";

export class CategoryModel extends Model {

  public static async getCategoryProductShopModel(data: GetCategoryProductByShop, callback: CallbackHandler) {
    const dataSQL = [data.code_shop]
    pool.query(SqlRoot.SQL_GET_CATEGORY_PRODUCT_BY_SHOP(), dataSQL, callback)
  }
}
