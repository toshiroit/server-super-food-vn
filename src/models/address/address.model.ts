import pool from "../../database";
import { CallbackHandler } from "../../interfaces/model_query/modelQuery";
import { GetAddressByUser } from "../../types/address/address";
import Model from "../Model";
import SqlRoot from "../sql";

export class AddressModel extends Model {
  public static getAddressByUserModel = async (data: GetAddressByUser, callback: CallbackHandler) => {
    const dataResult = [data.code_user]
    pool.query(SqlRoot.SQL_GET_ADDRESS_BY_USER(), dataResult, callback)
  };
}
