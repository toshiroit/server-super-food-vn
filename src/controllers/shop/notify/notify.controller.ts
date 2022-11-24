import { Request, Response } from "express";
import { getDataUser } from "../../../libs/getUserToken";
import { NotifyShopModel } from "../../../models/shop/notify/notify.model";
const dataUserTK = (req: Request) => {
  const { cookie } = req.headers
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer)
  return data_user;
}
export const getAllNotifyByShop = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query
    const data_user = dataUserTK(req)
    const code_shop = data_user?.payload.code_shop
    await NotifyShopModel.getAllNotifyByShopModel({ code_shop, limit: Number(limit) || 15 }, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          res.json({
            data: result.rows
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
