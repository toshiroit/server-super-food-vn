import config from '../../config/config';
import pool from '../../database';
import { CallbackHandler } from '../../interfaces/model_query/modelQuery';
import { getPagination } from '../../libs/getPagination';
import { DataGetOrdeDetailByUser, OrderGetByUserData } from '../../types/order/order';
import Model from '../Model';
import SqlRoot from '../sql';

export class OrderModel extends Model {
  public static async getOrderByUserModel(data: OrderGetByUserData, callback: CallbackHandler) {
    let sql_result = SqlRoot.SQL_GET_ORDER_BY_USER();

    if (data.text_search && data.text_search.length > 0 && data.text_search !== 'undefined' && data.text_search !== 'null') {
      sql_result += ` AND o.code_order='${data.text_search}' `;
    }
    if (
      data.date_start &&
      data.date_start !== 'undefined' &&
      data.date_start !== 'null' &&
      data.date_end &&
      data.date_end !== 'undefined' &&
      data.date_end !== 'null'
    ) {
      sql_result += ` AND o.date_order BETWEEN '${data.date_start}' and '${data.date_end}' `;
    }
    if (data.status_order === 'all') {
      sql_result += ` `;
    }
    if (data.status_order === '-1') {
      sql_result += ` AND od.progress=-1 `;
    }
    if (data.status_order === '-11') {
      sql_result += ` AND (od.progress=-1 OR od.progress=1) `;
    }
    if (data.status_order === '2') {
      sql_result += ` AND od.progress=2 `;
    }
    if (data.status_order === '23') {
      sql_result += ` AND (od.progress=2 OR od.progress=3) `;
    }
    if (data.status_order === '3') {
      sql_result += ` AND od.progress=3 `;
    }
    if (data.status_order === '34') {
      sql_result += ` AND ( od.progress=3 OR od.progress=4) `;
    }
    if (data.status_order === '4') {
      sql_result += ` AND od.progress=4 `;
    }
    if (data.status_order === '45') {
      sql_result += ` AND (od.progress=4 OR od.progress=5) `;
    }
    if (data.status_order === '56') {
      sql_result += ` AND (od.progress=5 OR od.progress=6) `;
    }
    if (data.status_order === '5') {
      sql_result += ` AND od.progress=5 `;
    }
    if (data.status_order === '6') {
      sql_result += ` AND od.progress=6 `;
    }
    if (data.status_order === '-2') {
      sql_result += ` AND od.progress=-2 `;
    }
    if (data.status_order === '-3') {
      sql_result += ` AND od.progress=-3 `;
    }
    if (data.sort_order === '3') {
      sql_result += ' ORDER BY od.total_order ASC ';
    }
    if (data.sort_order === '4') {
      sql_result += ' ORDER BY od.total_order DESC ';
    }
    sql_result += ' ORDER BY o.date_order DESC ';
    // sql_result += ` ORDER BY o.date_order DESC `;
    const { limit, offset } = getPagination(Number(data.page || 0) === 0 ? 1 : Number(data.page), Number(config.order_user_limit_show));
    if (limit !== null && offset !== null) {
      sql_result += ` LIMIT ${limit} OFFSET ${offset} `;
    }

    const dataSQL = [data.codeUser];
    pool.query(sql_result, dataSQL, callback);
  }
  public static async getCountOrderByUserModel(data: OrderGetByUserData) {
    let sql_result = SqlRoot.SQL_GET_COUNT_ORDER_BY_USER();
    console.log(data);
    if (data.text_search && data.text_search.length > 0 && data.text_search !== 'undefined' && data.text_search !== 'null') {
      sql_result += ` AND o.code_order='${data.text_search}' `;
    }
    if (
      data.date_start &&
      data.date_start !== 'undefined' &&
      data.date_start !== 'null' &&
      data.date_end &&
      data.date_end !== 'undefined' &&
      data.date_end !== 'null'
    ) {
      sql_result += ` AND o.date_order BETWEEN '${data.date_start}' and '${data.date_end}' `;
    }
    if (data.status_order === 'all') {
      sql_result += ` `;
    }
    if (data.status_order === '-1') {
      sql_result += ` AND od.progress=-1 `;
    }
    if (data.status_order === '-11') {
      sql_result += ` AND od.progress=-1 OR od.progress=1`;
    }
    if (data.status_order === '2') {
      sql_result += ` AND od.progress=2 `;
    }
    if (data.status_order === '23') {
      sql_result += ` AND od.progress=2 OR od.progress=3`;
    }
    if (data.status_order === '3') {
      sql_result += ` AND od.progress=3 `;
    }
    if (data.status_order === '4') {
      sql_result += ` AND od.progress=4 `;
    }
    if (data.status_order === '5') {
      sql_result += ` AND od.progress=5 `;
    }
    if (data.status_order === '56') {
      sql_result += ` AND (od.progress=5 OR od.progress=6) `;
    }
    if (data.status_order === '6') {
      sql_result += ` AND od.progress=6 `;
    }
    if (data.status_order === '-2') {
      sql_result += ` AND od.progress=-2 `;
    }

    const dataSQL = [data.codeUser];
    return pool.query(sql_result, dataSQL);
  }

  public static async getOrderDetailByUser(data: DataGetOrdeDetailByUser, callback: CallbackHandler) {
    const dataResult = [data.code_user, data.code_order];
    pool.query(SqlRoot.SQL_GET_ORDER_DETAIL_BY_USER(), dataResult, callback);
  }

  public static async confirmOrderSuccessUserModel(data: { code_user: string; code_order: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_CONFIRM_ORDER_SUCCESS_USER(), [data.code_order, data.code_user], callback);
  }
}
