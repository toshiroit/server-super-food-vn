import pool from "../../database";
import formatSQL from 'pg-format'
import { CallbackHandler } from "../../interfaces/model_query/modelQuery";
import { makeId } from "../../libs/make_id";
import Model from "../Model";

export class CheckoutModel extends Model {

  public static async checkoutOrderUserModel(data: { data_product: any, data_user: any }, callback: CallbackHandler) {
    const data_product_result = [] as any[]
    const data_product_result_2 = [] as any[]

    if (data.data_product) {
      const arrDataProduct = data.data_product
      arrDataProduct.map((item: any) => {
        const code_order_detail = makeId(15)
        const dataSQL = [
          makeId(15),
          data.data_user.code_user,
          item.code_address,
          new Date(Date.now()).toISOString(),
          1,
          code_order_detail,
          JSON.stringify(item.code_product),
          1,
        ]
        const dataSQL_2 = [
          code_order_detail,
          data.data_user.phone,
          data.data_user.phone,
          item.code_payment,
          item.code_shop,
          item.total_order,
          item.quatity,
          1
        ]
        data_product_result_2.push(dataSQL_2)
        data_product_result.push(dataSQL)
      })

      const formatSQLCheckout = formatSQL(
        `
          INSERT INTO order_sp
	          (code_order, code_user, code_address, date_order, status, code_order_detail, code_product, status_order)
	        VALUES %L 
        `, data_product_result
      )
      const formatSQLCheckoutDetail = formatSQL(
        `
        INSERT INTO order_detail_sp
	              (code_order_detail, phone_order, phone_shipw, code_payment, code_shop, total_order, quatity, progress)
        VALUES %L 
        `, data_product_result_2
      )
      await pool.query(formatSQLCheckoutDetail, [])
      pool.query(formatSQLCheckout, [], callback)
    }
  }
}
