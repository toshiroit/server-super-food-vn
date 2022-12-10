import { Request, Response } from 'express';
import { getDataUser } from '../../libs/getUserToken';
import { IndexModel } from '../../models/index/index.model';
const dataUserTK = (req: Request) => {
  const { cookie } = req.headers;
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer);
  return data_user;
};

export const getAllIndexData = async (req: Request, res: Response) => {
  try {
    const data_user = dataUserTK(req);
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
