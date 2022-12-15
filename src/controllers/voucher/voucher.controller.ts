import { Request, Response } from 'express';
import { VoucherModel } from '../../models/voucher/voucher.model';
import { VoucherDataCheck } from '../../types/voucher/voucher';

export const checkVoucherProductByVoucherShop = async (req: Request, res: Response) => {
  try {
    const dataSQL: VoucherDataCheck = {
      code_product: JSON.parse((req.query.code_product as string) || '') || '',
      code_voucher: (req.query.code_w_voucher as string) || '',
    };
    await VoucherModel.checkVoucherProductByVoucherShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rows && result.rows.length > 0) {
            res.json({
              data: result.rows[0],
            });
          } else {
            res.status(400).json({
              message: 'Ma giam gia khong ton tai',
            });
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
