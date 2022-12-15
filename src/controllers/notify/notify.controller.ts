import { Request, Response } from 'express';
import { dataUserTK } from '../../libs/data_user';
import { makeId } from '../../libs/make_id';
import { timeVietNameYesterday } from '../../libs/timeVietNam';
import { NotifyModel } from '../../models/notify/notify.model';
import { NotifyType } from '../../types/notify/notify';

export const getAllNotifyUser = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    NotifyModel.getAllNotifyUser({ code_user: data_user?.payload.code_user || '' }, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          res.json({
            data: result.rows,
          });
        }
      }
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const addNewNotifyShop = async (req: Request, res: Response) => {
  try {
    const { code_shop, title, info } = req.body;
    const dataSQL: NotifyType = {
      code_notify_shop: makeId(15),
      code_shop: code_shop,
      title: title,
      info: info,
      code_type_notify: makeId(15),
      createdAt: timeVietNameYesterday(),
    };
    await NotifyModel.addNewNotifyShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              message: 'Thành công',
            });
          }
        }
      }
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
