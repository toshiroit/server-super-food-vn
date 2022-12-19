import { Request, Response } from 'express';
import { dataUserTK } from '../../libs/data_user';
import { getDataUser } from '../../libs/getUserToken';
import { IndexModel } from '../../models/index/index.model';
export const getAllIndexData = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const code_shop = data_user?.payload.code_shop;
    await IndexModel.getAllIndexDataModel({ code_shop: (code_shop as string) || '' }, (err, result) => {
      if (err) {
        res.json({
          err,
        });
      } else {
        if (result) {
          res.json({
            data: result.rows[0],
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
