import { Request, Response } from "express";
import { getDataUser } from "../../libs/getUserToken";
import { makeId } from "../../libs/make_id";
import { CheckoutModel } from "../../models/checkout/checkout.model";
import { CheckoutOrderType } from "../../schemas/checkout/checkout.schema";
export const dataUserTK = (req: Request) => {
  const { cookie } = req.headers
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer)
  return data_user;
}
export const checkoutUser = async (req: Request, res: Response) => {
  try {
    const data_user = dataUserTK(req)
    const dataSQL = {
      data_product: req.body.data_product,
      data_user: data_user?.payload

    }
    await CheckoutModel.checkoutOrderUserModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            status: 200,
            data: result,
            message: 'Đơn hàng đã đặt thành công'
          })
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}
