import { QueryResult } from 'pg';
import { hasPassword, comparePassword } from './../../libs/hash_password';
import { LoginAuth, PhoneSendCodeAuth } from './../../types/schemas/authSchema.type';
import { CallbackHandler } from './../../interfaces/model_query/modelQuery';
import config from '../../config/config';
import Model from '../Model';
import bcrypt from 'bcrypt';
import { modelQuery } from '../../interfaces/model_query/modelQuery';
import pool from '../../database';
import SqlRoot from '../sql';
import { User } from '../../types/user.type';
import { getDataObjectFields } from '../../libs/get_fields_object';
import { getDataObjectValues } from '../../libs/get_values_object';
import twilio from 'twilio';

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

  public static async authenticateModel(valueQuery: modelQuery, callback: CallbackHandler) {}
  public static loginUserModel = async (valueQuery: modelQuery, callback: CallbackHandler): Promise<any> => {
    const data: LoginAuth = valueQuery.value as LoginAuth;
    const dataLogin = [data.phone, data.username];

    let result: QueryResult<any> | null = null;
    if (data.phone && data.username) {
      result = await pool.query(SqlRoot.SQL_LOGIN_USER_FULL(), dataLogin);
      console.log('RESULT : ', result.rows);
    } else {
      result = await pool.query(SqlRoot.SQL_LOGIN_USER('users'), dataLogin);
    }

    if (result.rows.length || result.rows.length > 0) {
      const { password: hasPassword } = result.rows[0];
      const isPassword = comparePassword(data.passwordConfirmation, hasPassword);
      if (isPassword) {
        if (data.phone && data.username) {
          return pool.query(SqlRoot.SQL_LOGIN_USER_FULL(), dataLogin, callback);
        } else if (!data.phone && data.username) {
          return pool.query(SqlRoot.SQL_GET_USER_USER_NAME(), [data.username], callback);
        } else if (data.phone && !data.username) {
          return pool.query(SqlRoot.SQL_GET_USER_PHONE(), [data.phone], callback);
        } else {
          return callback(null, null);
        }
      } else {
        return callback(null, null);
      }
    } else {
      return callback(null, null);
    }
  };

  /**
   * Register User
   * @param valueQuery value Query
   * @param callback return callback -> request and response query
   */
  public static async registerUserModel(valueQuery: modelQuery, callback: CallbackHandler) {
    const field = getDataObjectFields(valueQuery.value);
    const value = getDataObjectValues(valueQuery.value);
    try {
      pool.query(SqlRoot.SQL_INSERT_DATA_PS(valueQuery.table, field, value), callback);
      //console.log(SqlRoot.SQL_INSERT_DATA_PS(valueQuery.table, field, value));
    } catch (error) {}
  }
  public static async verifyAuthMailerModel(valueQuery: modelQuery, callback: CallbackHandler) {
    const data: any[] = valueQuery.value as [];
    return pool.query(SqlRoot.SQL_GET_ONE_USER_VERIFY_MAILER_CODE(), data, callback);
  }
}
