import { QueryResult } from 'pg';
import { hasPassword, comparePassword } from './../../libs/hash_password';
import { CallbackHandler } from './../../interfaces/model_query/modelQuery';
import config from '../../config/config';
import Model from '../Model';
import { modelQuery } from '../../interfaces/model_query/modelQuery';
import pool from '../../database';
import SqlRoot from '../sql';
import twilio from 'twilio';
import { Error } from '../../interfaces/error.interface';
import { AuthLoginAdmin } from '../../types/auth/auth.type';

export class AuthModel extends Model {
  public static async sendCodeModel(
    data: {
      phone: string;
      capCha: string;
    },
    callback: (err: any | null, result: any | null) => void
  ) {
    twilio(config.twilio_account_sid, config.twilio_auth_token, {
      lazyLoading: true,
    })
      .messages.create({
        from: '19567585828',
        to: `+84${data.phone}`,
        body: `Code verify phone account : ${data.capCha}`,
      })
      .then(res => {
        return callback(null, res);
      })
      .catch(err => {
        return callback(err, null);
      });
  }

  public static async checkPhone(valueQuery: modelQuery, callback: CallbackHandler) {
    const data = valueQuery.value as [];
    pool.query(SqlRoot.SQL_GET_ONE(valueQuery.table, valueQuery.field), data, callback);
  }

  public static updateRefreshToken = async (data: any[]) => {
    pool.query(SqlRoot.SQL_UPDATE_REFRESH_TOKEN_USER(), data);
  };

  public static async authenticateModel(valueQuery: modelQuery, callback: CallbackHandler) { }
  public static loginUserModel = async (valueQuery: modelQuery, callback: CallbackHandler): Promise<any> => {
    let result: QueryResult<any> | null = null;
    result = await pool.query(SqlRoot.SQL_LOGIN_USER_FULL(), [valueQuery.value.phone]);
    if (result.rows.length > 0 && result.rows.length) {
      const { password: hasPassword } = result.rows[0];
      const isPassword = comparePassword(valueQuery.value.password, hasPassword.trim());
      const error: Error = {
        message: 'Tài khoản hoặc mật khẩu không chính xác ',
        name: 'error login',
        status: 401,
      };

      if (isPassword) {
        pool.query(SqlRoot.SQL_GET_USER_PHONE(), [valueQuery.value.phone], callback);
      } else {
        callback(null, null);
      }
    } else {
      const data = [
        valueQuery.value.code_user,
        valueQuery.value.hashPassword,
        'ROLE-WIXO-USER',
        valueQuery.value.phone,
        new Date(Date.now()).toISOString(),
        false,
      ];
      const dataReg = [
        valueQuery.value.code_user,
        valueQuery.value.code_user_detail,
        valueQuery.value.hashPassword,
        'ROLE-WIXO-USER',
        valueQuery.value.phone,
        new Date(Date.now()).toISOString(),
        false,
        valueQuery.value.full_name,
        valueQuery.value.sex,
        valueQuery.value.code_restpass,
        valueQuery.value.createdAtDetail,
      ]
      const valueQueryRegister: modelQuery = {
        table: 'user_sp',
        obj: {
          condition: null,
        },
        field: null,
        value: dataReg,
      };
      this.registerUserModel(valueQueryRegister, (err, result) => {
        callback(err, result);
      });
    }
  };

  /**
   * Register User
   * @param valueQuery value Query
   * @param callback return callback -> request and response query
   */
  public static async registerUserModel(valueQuery: modelQuery, callback: CallbackHandler) {
    const data = valueQuery.value as [];
    pool.query(SqlRoot.SQL_REGISTER_USER_PS(), data, callback);
  }
  public static async verifyAuthMailerModel(valueQuery: modelQuery, callback: CallbackHandler) {
    const data: any[] = valueQuery.value as [];
    return pool.query(SqlRoot.SQL_GET_ONE_USER_VERIFY_MAILER_CODE(), data, callback);
  }

  public static async getUserAdminModel(data: AuthLoginAdmin) {
    const dataResult = [data.user_name]
    return pool.query(SqlRoot.SQL_GET_USER_ADMIN(), dataResult)
  }

  public static async getMeShopModel(data: { code_user: string }, callback: CallbackHandler) {
    const dataResult = [data.code_user]
    pool.query(SqlRoot.SQL_GET_ME_SHOP(), dataResult, callback)
  }
}
