import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { getDataUser } from '../../../libs/getUserToken';
import { makeId } from '../../../libs/make_id';
import { timeVietNameFullTime } from '../../../libs/timeVietNam';
import { NotifyShopModel } from '../../../models/shop/notify/notify.model';
import { NotifyType } from '../../../types/notify/notify';

export const getDetailNotifyByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL = {
      code_shop: data_user?.payload.code_shop,
      code_notify: (req.query.code_notify as string) || '',
    };
    await NotifyShopModel.getDetailNotifyByShopModel(dataSQL, (err, result) => {
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

export const addNewNotifyByUser = async (req: Request, res: Response) => {
  try {
    const dataSQL: NotifyType = {
      code_notify_shop: makeId(15),
      code_shop: '',
      code_type_notify: '',
      createdAt: timeVietNameFullTime(),
      info: req.body.info,
      title: req.body.title,
      code_user: req.body.code_user,
    };
    await NotifyShopModel.addNewNotifyByUserModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({ message: 'Success' });
          } else {
            res.json({ message: 'Error' });
          }
        }
      }
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const getAllNotifyByShop = async (req: Request, res: Response) => {
  try {
    const { limit, type } = req.query;
    const data_user = await dataUserTK(req);
    const code_shop = data_user?.payload.code_shop;
    await NotifyShopModel.getAllNotifyByShopModel({ code_shop, limit: Number(limit) || 15, type: Number(type) }, (err, result) => {
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
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
