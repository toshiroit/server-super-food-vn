import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { SettingModel } from '../../../models/shop/setting/setting.mod';
import { SettingUpdate } from '../../../types/setting/setting';

export const getSettingByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const code_shop = data_user?.payload.code_shop;
    await SettingModel.getSettingByShopModel({ code_shop: (code_shop as string) || '' }, (err, result) => {
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
export const updateSettingByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const code_shop = data_user?.payload.code_shop;
    const data = req.body;
    const dataSQL: SettingUpdate = {
      code_shop: data_user?.payload.code_shop,
      info_mail: data.info_mail,
      info_phone: data.info_phone,
      auto_backup: data.auto_backup,
      security_login: data.security_login,
      security_password_v2: data.security_password_v2,
    };
    await SettingModel.updateSettingByShopModel(dataSQL, (err, result) => {
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
