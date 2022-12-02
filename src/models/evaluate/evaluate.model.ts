import pool from '../../database';
import { CallbackHandler } from '../../interfaces/model_query/modelQuery';
import { EvaluateCheck, EvaluateData } from '../../types/evaluate/evaluate';
import Model from '../Model';
import SqlRoot from '../sql';

export class EvaluateModel extends Model {
  public static async addEvaluateByProductModel(data: EvaluateData, callback: CallbackHandler) {
    const dataSQL = [
      data.code_evaluate,
      data.code_user,
      data.code_product,
      data.evaluate_product,
      data.evaluate_ship,
      data.evaluate_progress,
      data.images,
      data.text,
      data.createdAt,
      data.code_order,
    ];
    pool.query(SqlRoot.SQL_ADD_EVALUATE_BY_PRODUCT(), dataSQL, callback);
  }

  public static async checkEvaluateByProductUserOrderModel(data: EvaluateCheck) {
    return pool.query(SqlRoot.SQL_CHECK_EVALUATE_BY_PRODUCT_USER_ORDER(), [data.code_user, data.code_product, data.code_order]);
  }
  public static async getCountEvaluateByProduct(data: { code_product: string }) {
    return pool.query(SqlRoot.SQL_GET_COUNT_EVALUATE_BY_PRODUCT(), [data.code_product]);
  }
  public static async getEvaluateByProduct(data: { code_product: string; limit: number }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_EVALUATE_BY_PRODUCT(), [data.code_product, data.limit], callback);
  }
  public static async getCountEvaluate5Model(data: { code_product: string }) {
    return pool.query(SqlRoot.SQL_GET_EVALUATE_PRODUCT_5(), [data.code_product]);
  }
  public static async getCountEvaluate4Model(data: { code_product: string }) {
    return pool.query(SqlRoot.SQL_GET_EVALUATE_PRODUCT_4(), [data.code_product]);
  }
  public static async getCountEvaluate3Model(data: { code_product: string }) {
    return pool.query(SqlRoot.SQL_GET_EVALUATE_PRODUCT_3(), [data.code_product]);
  }
  public static async getCountEvaluate2Model(data: { code_product: string }) {
    return pool.query(SqlRoot.SQL_GET_EVALUATE_PRODUCT_2(), [data.code_product]);
  }
  public static async getCountEvaluate1Model(data: { code_product: string }) {
    return pool.query(SqlRoot.SQL_GET_EVALUATE_PRODUCT_1(), [data.code_product]);
  }
  public static async getCountAllEvaluateModel(data: { code_product: string }) {
    return pool.query(SqlRoot.SQL_GET_COUNT_ALL_EVALUATE_PRODUCT(), [data.code_product]);
  }
}
