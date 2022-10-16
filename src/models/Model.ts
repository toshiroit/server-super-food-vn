import pool from '../database';
import { getDataObjectValues } from '../libs/get_values_object';
import { CallbackHandler, modelQuery, paginateList } from './../interfaces/model_query/modelQuery';
import SqlRoot from './sql';
class Model {
  public static getOne = async (value: modelQuery, callback: CallbackHandler) => {
    const data = value.value as any[];
    pool.query(SqlRoot.SQL_GET_ONE(value.table, value.field), data, callback);
  };

  protected static addData = async (value: modelQuery, callback: CallbackHandler) => {
    pool.query(SqlRoot.SQL_INSERT_DATA(value.table), [value.value], (err, result) => callback(err, result));
  };

  protected static updateData = async (value: modelQuery, callback: CallbackHandler) => {
    pool.query(SqlRoot.SQL_UPDATE_DATA(value.table, value.condition), [value.obj, value.obj.condition], (err, result) =>
      callback(err, result)
    );
  };

  protected static deleteData = async (value: modelQuery, callback: CallbackHandler) => {
    pool.query(SqlRoot.SQL_DELETE_DATA(value.table, value.condition), [value.value], (err, result) =>
      callback(err, result)
    );
  };

  protected static getAll = async (value: modelQuery, callback: CallbackHandler) => {
    pool.query(SqlRoot.SQL_GET_ALL(value.table, value.field), callback);
  };

  public static getAllNoField = async (value: modelQuery, callback: CallbackHandler) => {
    return pool.query(SqlRoot.SQL_GET_ALL_NO_FIELD(value.table, value.field), (err, result) => {
      return callback(err, result);
    });
  };

  protected static getPaginateList = async (value: paginateList, callback: CallbackHandler) => {
    const page_size = 10;
    const skip = ((value.page as number) - 1) * page_size;

    if (value.value2 === -1 && (value.field2 === '' || value.field2 === null)) {
      pool.query(
        SqlRoot.SQL_GET_PAGINATE_LIST_2(value.table),
        [value.field, value.value, value.order_field, page_size, skip],
        (err, result) => callback(err, result)
      );
    } else {
      pool.query(
        SqlRoot.SQL_GET_PAGINATE_LIST_2(value.table),
        [value.field, value.value, value.field2, page_size, skip],
        (err, result) => callback(err, result)
      );
    }
  };
}
export default Model;
