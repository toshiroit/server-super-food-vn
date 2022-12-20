import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { StatisticalFUll, StatisticalPrice } from '../../../types/statistical/statistical';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class StatisticalModel extends Model {
  public static async getStatisticalValueModel(data: StatisticalPrice, callback: CallbackHandler) {
    const dataSQL = [
      data.code_shop,
      data.date_today,
      data.date_yesterday,
      data.date_lastMonth,
      data.date_lastMonth2,
      data.date_lastMonth_1,
      data.date_lastMonth_2,
    ];
    pool.query(SqlRoot.SQL_GET_STATISTICAL_VALUE_SHOP(), dataSQL, callback);
  }

  public static async getStatisticalFullModel(data: StatisticalFUll, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_STATISTICAL_FULL_W(), [data.code_shop, data.year], callback);
  }
}

/**
 
,(
             

 */
