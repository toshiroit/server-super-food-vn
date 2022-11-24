import { Request, Response } from "express";
import { makeId } from "../../libs/make_id";
import { timeVietNameYesterday } from "../../libs/timeVietNam";
import { notifyModel } from "../../models/notify/notify.model";
import { NotifyType } from "../../types/notify/notify";

export const addNewNotifyShop = async (req: Request, res: Response) => {
  try {
    const { code_shop, title, info } = req.body
    const dataSQL: NotifyType = {
      code_notify_shop: makeId(15),
      code_shop: code_shop,
      title: title,
      info: info,
      code_type_notify: makeId(15),
      createdAt: timeVietNameYesterday()
    }
    await notifyModel.addNewNotifyShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              message: 'Thành công'
            })
          }
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}


