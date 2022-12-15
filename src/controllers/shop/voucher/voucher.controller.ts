import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { makeId } from '../../../libs/make_id';
import { timeVietNameFullTime } from '../../../libs/timeVietNam';
import { VoucherModel } from '../../../models/shop/voucher/voucher.model';
import { VoucherCodeProductType, VoucherDataAddNew, VoucherDataFilter, VoucherDataType } from '../../../types/voucher/voucher';

export const updateVoucherByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL: VoucherDataAddNew = {
      code_voucher: req.body.code_voucher,
      name_voucher: req.body.name_voucher,
      price_voucher: req.body.price_voucher,
      code_type_voucher: req.body.code_type_voucher,
      description: req.body.description,
      code_w_voucher: req.body.code_w_voucher,
      time_start: req.body.time_start,
      time_end: req.body.time_end,
      updatedat: timeVietNameFullTime(),
      quality: req.body.quality,
      code_shop: data_user?.payload.code_shop,
      type_price: req.body.type_price,
      code_product: req.body.code_product,
      createdat: '',
    };
    await VoucherModel.updateDataVoucherModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              message: 'Cập nhật thành công',
            });
          } else {
            res.status(400).json({
              message: 'Cập nhật không thành công',
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

export const addNewVoucherByShop = async (req: Request, res: Response) => {
  try {
    const data_user = dataUserTK(req);
    const dataSQL: VoucherDataAddNew = {
      code_voucher: makeId(15),
      name_voucher: req.body.name_voucher,
      price_voucher: req.body.price_voucher,
      code_type_voucher: req.body.code_type_voucher,
      description: req.body.description,
      code_w_voucher: req.body.code_w_voucher,
      time_start: req.body.time_start,
      time_end: req.body.time_end,
      createdat: timeVietNameFullTime(),
      quality: req.body.quality,
      code_shop: data_user?.payload.code_shop,
      type_price: req.body.type_price,
      code_product: req.body.code_product as VoucherCodeProductType[],
    };
    await VoucherModel.addNewVoucherModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              message: 'Thêm thành công',
            });
          } else {
            res.status(400).json({
              message: 'Thêm không thành công - !Lỗi',
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
export const getAllVoucher = async (req: Request, res: Response) => {
  try {
    const data_user = dataUserTK(req);
    const { type_voucher, name_voucher, time_start, time_end, status } = req.query;
    const dataFilter: VoucherDataFilter = {
      name_voucher: name_voucher as string,
      type_voucher: type_voucher as string,
      time_start: time_start as string,
      time_end: time_end as string,
      status: Boolean(status),
    };
    console.log(req.query);
    const code_shop = data_user?.payload.code_shop || '';
    await VoucherModel.getAllVoucherModel({ code_shop, data_filter: dataFilter }, (err, result) => {
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

export const removeVoucherShopByCode = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL = {
      code_shop: data_user?.payload.code_shop,
      code_voucher: (req.query.code_voucher as string) || '',
    };
    await VoucherModel.removeDataVoucherModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          res.json({
            message: 'OK',
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

export const getDetailVoucherShopByCode = async (req: Request, res: Response) => {
  try {
    const code_shop = dataUserTK(req)?.payload.code_shop;
    const dataSQL = {
      code_shop,
      code_voucher: (req.query.code_voucher as string) || '',
    };
    await VoucherModel.getDetailVoucherModel(dataSQL, (err, result) => {
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
