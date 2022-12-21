import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { FollowModel } from '../../../models/shop/follow/follow.model';

export const getAllUserFollowByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL = {
      code_shop: data_user?.payload.code_shop,
    };
    FollowModel.getAllUserFollowByShop(dataSQL, (err, result) => {
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
      error: error,
    });
  }
};
