import pool from '../../../database';
import { CallbackHandler } from '../../../interfaces/model_query/modelQuery';
import { SettingUpdate } from '../../../types/setting/setting';
import Model from '../../Model';
import SqlRoot from '../../sql';

export class SettingModel extends Model {
  public static async getSettingByShopModel(data: { code_shop: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_SETTING_BY_SHOP(), [data.code_shop], callback);
  }
  public static async updateSettingByShopModel(data: SettingUpdate, callback: CallbackHandler) {
    const dataSQL = [data.code_shop, data.info_mail, data.info_phone, data.security_login, data.security_password_v2, data.auto_backup];
    pool.query(SqlRoot.SQL_UPDATE_SETTING_BY_SHOP(), dataSQL, callback);
  }
}
