import pool from "../../database";
import formatSQL from 'pg-format'
import { CallbackHandler, modelQuery } from "../../interfaces/model_query/modelQuery";
import Model from "../Model";
import SqlRoot from "../sql";

export class CartModel extends Model {
  public static async getCartModel(code_user: string, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_CART_BY_CODE_USER(), [code_user], callback)
  }

  public static async addCartByCodeUserModel(data: modelQuery, callback: CallbackHandler) {
    const dataCartArr = data.value
    const dataResult = []
    const time = new Date().toISOString();
    let i = 0;
    if (dataCartArr[0].length > 1) {
      while (i < dataCartArr[0].length) {
        dataCartArr[0][i].code_user = dataCartArr[1]
        dataCartArr[0][i].createdat = time;
        dataResult.push([
          dataCartArr[0][i].code_cart,
          dataCartArr[0][i].code_user,
          dataCartArr[0][i].code_product,
          dataCartArr[0][i].quality_product,
          dataCartArr[0][i].createdat,
        ])
        i++;
      }
      const formatQuery = formatSQL(
        `INSERT INTO cart_sp (code_cart,code_user,code_product,quality_product,createdat)
         VALUES %L on conflict (code_cart)
         DO UPDATE SET quality_product=EXCLUDED.quality_product,createdat=EXCLUDED.createdat`,
        dataResult
      )
      pool.query(formatQuery, [], callback)
    }
    else {
      const dataFW = [
        dataCartArr[0][0].code_cart,
        dataCartArr[1],
        dataCartArr[0][0].code_product,
        dataCartArr[0][0].quality_product,
        time,
      ]
      const formatQuery = formatSQL(
        `INSERT INTO cart_sp (code_cart,code_user,code_product,quality_product,createdat)
         VALUES (%L) on conflict (code_cart)
         DO UPDATE SET quality_product=EXCLUDED.quality_product,createdat=EXCLUDED.createdat`,
        dataFW
      )
      pool.query(formatQuery, [], callback)
    }
  }



  public static async updateCartByCodeUserModel(data: modelQuery, callback: CallbackHandler) {
    const dataCartArr = data.value
    const dataResult = []
    const time = new Date().toISOString();
    let i = 0;
    if (dataCartArr[0].length > 1) {
      while (i < dataCartArr[0].length) {
        dataCartArr[0][i].code_user = dataCartArr[1]
        dataCartArr[0][i].createdat = time;
        dataResult.push([
          dataCartArr[0][i].code_cart,
          dataCartArr[0][i].code_user,
          dataCartArr[0][i].code_product,
          dataCartArr[0][i].quality_product,
          dataCartArr[0][i].createdat,
        ])
        i++;
      }
      pool.query(SqlRoot.SQL_UPDATE_CART_BY_CODE_USER(), dataResult, callback)
    }
    else {
      const dataFW = [
        dataCartArr[0][0].code_cart,
        dataCartArr[1],
        dataCartArr[0][0].code_product,
        dataCartArr[0][0].quality_product,
        time,
      ]
      pool.query(SqlRoot.SQL_UPDATE_CART_BY_CODE_USER(), dataFW, callback)
    }
  }

  public static async removeCartByCodeCartModel(data: modelQuery, callback: CallbackHandler) {
    const dataQuery: [] = data.value
    pool.query(SqlRoot.SQL_REMOVE_CART_BY_CODE_CART_AND_USER(), dataQuery, callback)
  }
}
