import pool from '../../database';
import { CallbackHandler } from '../../interfaces/model_query/modelQuery';
import { makeId } from '../../libs/make_id';
import { DataAddressSQL, GetAddressByUser } from '../../types/address/address';
import Model from '../Model';
import SqlRoot from '../sql';

export class AddressModel extends Model {
  public static getAddressByUserModel = async (data: GetAddressByUser, callback: CallbackHandler) => {
    const dataResult = [data.code_user];
    pool.query(SqlRoot.SQL_GET_ADDRESS_BY_USER(), dataResult, callback);
  };
  public static async addAddressByUserModel(data: { item: DataAddressSQL }, callback: CallbackHandler) {
    const dataSQL = [
      makeId(15),
      data.item.data.code_user,
      data.item.data.full_name,
      data.item.data.phone,
      data.item.data.detail_address,
      data.item.data.status,
      makeId(15),
      data.item.data.email,
      data.item.data.street,
      data.item.data.village,
      data.item.data.district,
      data.item.data.city,
    ];
    pool.query(SqlRoot.SQL_INSERT_ADDRESS_BY_USER(), dataSQL, callback);
  }

  public static async removeAddressUserByCodeModel(data: { code_user: string; code_address: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_REMOVE_ADDRESS_USER_BY_CODE(), [data.code_address, data.code_user], callback);
  }

  public static updateStatusAddressByUserModel(data: { code_user: string; status: boolean; code_address: string }) {
    return pool.query(SqlRoot.SQL_UPDATE_STATUS_ADDRESS_BY_USER(), [data.status, data.code_user, data.code_address]);
  }

  public static async checkPhoneAddressIsEmptyByUser(data: { phone: string; code_user: string }) {
    return pool.query(SqlRoot.SQL_CHECK_ADDRESS_PHONE_IS_EMPTY_BY_USER(), [data.phone, data.code_user]);
  }

  public static async checkCountAddressByUser(data: { code_user: string }) {
    return pool.query(SqlRoot.SQL_CHECK_COUNT_ADDRESS_BY_USER(), [data.code_user]);
  }

  public static async getDetailAddressUserByCode(data: { code_address: string; code_user: string }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_DETAIL_ADDRESS_USER_BY_CODE(), [data.code_address, data.code_user], callback);
  }

  public static async updateAddressUserByCodeModel(data: DataAddressSQL, callback: CallbackHandler) {
    const dataSQL = [
      data.data.code_address,
      data.data.code_user,
      data.data.full_name,
      data.data.phone,
      data.data.detail_address,
      data.data.status,
      data.data.email,
      data.data.street,
      data.data.village,
      data.data.district,
      data.data.city,
    ];
    pool.query(SqlRoot.SQL_UPDATE_ADDRESS_USER_BY_CODE(), dataSQL, callback);
  }
}
