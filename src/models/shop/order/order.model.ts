import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { getPagination } from '../../../libs/getPagination';
import { toLowerCaseNonAccentVietnamese } from '../../../libs/nonAccentVietnamese';
import { OrderGetValueData } from '../../../types/order/order';
import { HideOrderByShopTp, RemoveOrderByShopTp } from '../../../types/shop/order/order';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class OrderModel extends Model {
  public static async getAllOrderByShop(data: OrderGetValueData, callback: CallbackHandler) {
    let sql_result = SqlRoot.SQL_GET_ALL_ORDER_BY_SHOP();
    const { offset, limit } = getPagination(data.page, 10);
    if (data.type === 'new_order') {
      sql_result += 'AND od.progress = -1 ';
    }
    if (data.type === 'check_out') {
      sql_result += 'AND (od.progress = 1 or od.progress=2) ';
    } else if (data.type === 'ship') {
      sql_result += ' AND (od.progress = 3 or od.progress=4 ) ';
    } else if (data.type === 'processing') {
      sql_result += ' AND (od.progress = 2 or od.progress= 3) ';
    } else if (data.type === 'all') {
      sql_result += ' ';
    } else if (data.type === 'check_out_2') {
      sql_result += 'AND (od.progress = 1) ';
    } else if (data.type === 'ship_start') {
      sql_result += ' AND (od.progress = 4) ';
    } else if (data.type === 'ship_success') {
      sql_result += ' AND (od.progress = 6 or od.progress=5  ) ';
    } else if (data.type === 'ship_notSuccess') {
      sql_result += ' AND (od.progress = -3 ) ';
    } else if (data.type === 'ship_notCancel') {
      sql_result += ' AND od.progress = -2  ';
    }
    if (data.value_search) {
      if (data.value_search.name_search && data.value_search.name_search !== 'null') {
        sql_result += ` and o.code_order = '${data.value_search.name_search}' or converttvkdau(ad.full_name) ilike '%${toLowerCaseNonAccentVietnamese(
          data.value_search.name_search
        )}%' `;
      }
      if (data.value_search.date_start !== 'null' && data.value_search.date_end && data.value_search.date_end !== 'null') {
        sql_result += ` and o.date_order BETWEEN '${data.value_search.date_start}' and '${data.value_search.date_end}' `;
      }
      if (data.value_search.status_order && data.value_search.status_order !== -99) {
        sql_result += ` and od.progress = ${data.value_search.status_order} `;
      }
      if (data.value_search.type_payment && data.value_search.type_payment !== -99) {
        const code_payment = data.value_search.type_payment === 1 ? 'PAYMENT_4912W_1' : 'PAYMENT_4912W_2';
        sql_result += ` and od.code_payment = '${code_payment}'`;
      }
    }
    sql_result += ` and od.code_shop=($1) `;
    sql_result += 'ORDER BY o.date_order DESC ';
    sql_result += ` LIMIT ${10} OFFSET ${offset} `;
    pool.query(sql_result, [data.code_shop], callback);
  }

  public static async getCountOrderByShop(data: OrderGetValueData) {
    let sql_result = SqlRoot.SQL_COUNT_ALL_ORDER_BY_SHOP();
    if (data.type === 'new_order') {
      sql_result += 'AND od.progress = -1 ';
    }
    if (data.type === 'check_out') {
      sql_result += 'AND (od.progress = 1 or od.progress=2) ';
    } else if (data.type === 'ship') {
      sql_result += ' AND (od.progress = 3 or od.progress=4 ) ';
    } else if (data.type === 'processing') {
      sql_result += ' AND (od.progress = 2 or od.progress= 3) ';
    } else if (data.type === 'all') {
      sql_result += ' ';
    } else if (data.type === 'check_out_2') {
      sql_result += 'AND (od.progress = 1) ';
    } else if (data.type === 'ship_start') {
      sql_result += ' AND (od.progress = 4) ';
    } else if (data.type === 'ship_success') {
      sql_result += ' AND (od.progress = 6 or od.progress=5  ) ';
    } else if (data.type === 'ship_notSuccess') {
      sql_result += ' AND (od.progress = -3 ) ';
    } else if (data.type === 'ship_notCancel') {
      sql_result += ' AND od.progress = -2  ';
    }
    if (data.value_search) {
      if (data.value_search.name_search && data.value_search.name_search !== 'null') {
        sql_result += ` and o.code_order = '${data.value_search.name_search}' or converttvkdau(ad.full_name) ilike '%${toLowerCaseNonAccentVietnamese(
          data.value_search.name_search
        )}%' `;
      }
      if (data.value_search.date_start !== 'null' && data.value_search.date_end && data.value_search.date_end !== 'null') {
        sql_result += ` and o.date_order BETWEEN '${data.value_search.date_start}' and '${data.value_search.date_end}' `;
      }
      if (data.value_search.status_order && data.value_search.status_order !== -99) {
        sql_result += ` and od.progress = ${data.value_search.status_order} `;
      }
      if (data.value_search.type_payment && data.value_search.type_payment !== -99) {
        const code_payment = data.value_search.type_payment === 1 ? 'PAYMENT_4912W_1' : 'PAYMENT_4912W_2';
        sql_result += ` and od.code_payment = '${code_payment}' `;
      }
    }
    // if (data.type === 'new_order') {
    //   sql_result += 'AND od.progress = -1  and od.progress > -2 ';
    // }
    // if (data.type === 'check_out') {
    //   sql_result += 'AND (od.progress = 1 or od.progress=2  and od.progress > -2) ';
    // } else if (data.type === 'ship') {
    //   sql_result += ' AND (od.progress = 3  and od.progress > -2) ';
    // } else if (data.type === 'processing') {
    //   sql_result += ' AND (od.progress = 2 or od.progress= 3  and od.progress > -2) ';
    // } else if (data.type === 'all') {
    //   sql_result += ' ';
    // } else if (data.type === 'check_out_2') {
    //   sql_result += 'AND (od.progress = 1 and od.progress > -2) ';
    // } else if (data.type === 'ship_start') {
    //   sql_result += ' AND (od.progress = 5  and od.progress > -2) ';
    // } else if (data.type === 'ship_success') {
    //   sql_result += ' AND (od.progress = 6  and od.progress > -2) ';
    // } else {
    //   sql_result += ' and od.progress > -2 ';
    // }
    // if (data.value_search) {
    //   if (data.value_search.name_search && data.value_search.name_search !== 'null') {
    //     sql_result += ` and o.code_order = '${data.value_search.name_search}' or converttvkdau(ad.full_name) ilike '%${toLowerCaseNonAccentVietnamese(
    //       data.value_search.name_search
    //     )}%' `;
    //   }
    //   if (data.value_search.date_start !== 'null' && data.value_search.date_end && data.value_search.date_end !== 'null') {
    //     sql_result += ` and o.date_order BETWEEN '${data.value_search.date_start}' and '${data.value_search.date_end}' `;
    //   }
    //   if (data.value_search.status_order && data.value_search.status_order !== -99) {
    //     sql_result += ` and od.progress = ${data.value_search.status_order} `;
    //   }
    //   if (data.value_search.type_payment && data.value_search.type_payment !== -99) {
    //     const code_payment = data.value_search.type_payment === 1 ? 'PAYMENT_4912W_1' : 'PAYMENT_4912W_2';
    //     sql_result += ` and od.code_payment = '${code_payment}'`;
    //   }
    // }

    return pool.query(sql_result, [data.code_shop]);
  }
  public static async getAllProductByOrderAndShop(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_PRODUCT_BY_ORDER_AND_SHOP(), [data.code_shop], callback);
  }

  public static async hideOrderByShop(data: HideOrderByShopTp, callback: CallbackHandler) {
    const dataSQL = [data.is_show, data.code_shop, data.code_order];
    pool.query(SqlRoot.SQL_HIDE_ORDER_BY_SHOP(), [dataSQL], callback);
  }

  public static async removeOrderByShopModel(data: RemoveOrderByShopTp, callback: CallbackHandler) {
    if (data.code_order_arr && data.code_order_arr !== 'null' && data.code_order_arr !== 'undefined') {
      let data_result = '';
      JSON.parse(data.code_order_arr).map((item: any, key: number) => {
        data_result += `'${item}'`;
        if (key + 1 !== JSON.parse(data.code_order_arr).length) {
          data_result += ',';
        }
      });
      pool.query(SqlRoot.SQL_REMOVE_ORDER_ARR_SHOP(data_result), [data.code_shop], callback);
    } else {
      pool.query(SqlRoot.SQL_REMOVE_ORDER_SHOP(), [data.code_order, data.code_shop], callback);
    }
  }

  public static async getOrderDetailByOrderAndShop(data: { code_shop: string; code_order: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ORDER_DETAIL_BY_ORDER_AND_SHOP(), [data.code_shop, data.code_order], callback);
  }
  public static async confirmOrderByCodeOrderModel(data: { value: number; code_order: string; code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_UPDATE_ORDER_BY_CODE_ORDER(), [data.code_order, data.code_shop, data.value], callback);
  }
}
