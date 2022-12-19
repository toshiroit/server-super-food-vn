import { Request, Response } from 'express';
import { dataUserTK } from '../../libs/data_user';
import { getDataUser } from '../../libs/getUserToken';
import { makeId } from '../../libs/make_id';
import { CheckoutModel } from '../../models/checkout/checkout.model';
import { CheckoutOrderType } from '../../schemas/checkout/checkout.schema';

export const checkoutUser = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL = {
      data_product: req.body.data_product,
      data_user: data_user?.payload,
    };
    await CheckoutModel.checkoutOrderUserModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          res.json({
            status: 200,
            data: result,
            message: 'Đơn hàng đã đặt thành công',
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
