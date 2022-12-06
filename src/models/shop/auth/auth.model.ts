import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class AuthModel extends Model {
  public static async authCheckUser(data: { user_name: string; phone: string }) {
    return pool.query(SqlRoot.SQL_CHECK_USER_REGISTER(), [data.user_name, data.phone]);
  }
  public static async authRegisterModel(data: any, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_REGISTER_SHOP(), data, callback);
  }

  public static async authCheckVerificationCode(data: { user_name: string; verification_code: string }) {
    return pool.query(SqlRoot.SQL_AUTH_CHECK_VERIFICATION_BY_USER(), [data.user_name, data.verification_code]);
  }

  public static async authIsCheckVerification(data: { user_name: string; verification_code: string }) {
    return pool.query(SqlRoot.SQL_AUTH_IS_VERIFICATION_BY_USER(), [data.user_name, data.verification_code]);
  }
  public static async authActiveAccountShopByUser(data: { user_name: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_ACTIVE_ACCOUNT_SHOP_BY_USER(), [data.user_name], callback);
  }

  public static async authGetVerificationCodeByUserName(data: { user_name: string }) {
    return pool.query(SqlRoot.SQL_AUTH_GET_VERIFICATION_ACCOUNT_BY_USER_NAME(), [data.user_name]);
  }
}
