import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { VoucherModel } from '../../../models/shop/voucher/voucher.model';

export const getAllVoucher = async (req: Request, res: Response) => {
  try {
    const data_user = dataUserTK(req);
    const code_shop = data_user?.payload.code_shop || '';
    await VoucherModel.getAllVoucherModel({ code_shop }, (err, result) => {
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
