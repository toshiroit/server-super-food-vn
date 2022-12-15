import { Request, Response } from 'express';
import { getDataUser } from '../../../libs/getUserToken';
import { NotifyShopModel } from '../../../models/shop/notify/notify.model';
import { NotifyType } from '../../../types/notify/notify';
const dataUserTK = (req: Request) => {
  const { cookie } = req.headers;
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer);
  return data_user;
};
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

export const getAllNotifyByShop = async (req: Request, res: Response) => {
  try {
    const { limit, type } = req.query;
    const data_user = dataUserTK(req);
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
