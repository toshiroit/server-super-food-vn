import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { HideOrderByShopTp, RemoveOrderByShopTp } from '../../../types/shop/order/order';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class OrderModel extends Model {
  public static async getAllOrderByShop(data: { code_shop: string; type?: any }, callback: CallbackHandler) {
    let sql_result = SqlRoot.SQL_GET_ALL_ORDER_BY_SHOP();
    console.log('TYPE : ', data.type);
    if (data.type === 'new_order') {
      sql_result += 'AND od.progress = -1';
    }
    if (data.type === 'check_out') {
      sql_result += 'AND od.progress = 1 or od.progress=2';
    } else if (data.type === 'ship') {
      sql_result += 'AND od.progress = 3';
    } else {
      sql_result += 'ORDER BY o.date_order DESC';
    }
    pool.query(sql_result, [data.code_shop], callback);
  }

  public static async getAllProductByOrderAndShop(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_PRODUCT_BY_ORDER_AND_SHOP(), [data.code_shop], callback);
  }

  public static async hideOrderByShop(data: HideOrderByShopTp, callback: CallbackHandler) {
    const dataSQL = [data.is_show, data.code_shop, data.code_order];
    pool.query(SqlRoot.SQL_HIDE_ORDER_BY_SHOP(), [dataSQL], callback);
  }

  public static async removeOrderByShopModel(data: RemoveOrderByShopTp, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_REMOVE_ORDER_SHOP(), [data.code_shop, data.code_order], callback);
  }

  public static async getOrderDetailByOrderAndShop(data: { code_shop: string; code_order: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ORDER_DETAIL_BY_ORDER_AND_SHOP(), [data.code_shop, data.code_order], callback);
  }
  public static async confirmOrderByCodeOrderModel(data: { value: number; code_order: string; code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_UPDATE_ORDER_BY_CODE_ORDER(), [data.code_order, data.code_shop, data.value], callback);
  }
}
