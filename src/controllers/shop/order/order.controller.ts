import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { getPagingData } from '../../../libs/getPagination';
import { getDataUser } from '../../../libs/getUserToken';
import { OrderModel } from '../../../models/shop/order/order.model';
import { HideOrderByShopTypeZod } from '../../../schemas/shop/order/order.schema';
import { OrderValueSearch } from '../../../types/order/order';
import { HideOrderByShopTp, RemoveOrderByShopTp } from '../../../types/shop/order/order';

export const addOrderByShop = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'TEST',
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const hideOrderByShop = async (req: Request<any, any, HideOrderByShopTypeZod>, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL: HideOrderByShopTp = {
      code_order: req.body.code_order,
      is_show: req.body.is_show,
      code_shop: data_user?.payload.code_shop,
    };
    await OrderModel.hideOrderByShop(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount === 1) {
            res.json({
              message: 'Ẩn đơn hàng thành công ',
            });
          } else if (result.rowCount === 0) {
            res.json({
              message: 'Ẩn đơn hàng không thành công ',
            });
          } else {
            res.json({
              message: 'Lỗi',
            });
          }
        }
      }
    });
    res.json({
      message: 'TEST',
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const getAllOrderByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const { name_search, date_start, date_end, status_order, type_payment } = req.query;
    if (data_user) {
      const code_shop = data_user?.payload.code_shop;
      const type = req.query.type;
      const page = req.query.page;

      const value_search: OrderValueSearch = {
        name_search: (name_search as string) || null,
        date_start: (date_start as string) || null,
        status_order: Number(status_order) || null,
        type_payment: Number(type_payment) || null,
        date_end: (date_end as string) || null,
      };
      console.log('value : ', value_search);
      const data_count = await OrderModel.getCountOrderByShop({ code_shop: code_shop, type: type, page: Number(page) || 1, value_search: value_search });
      await OrderModel.getAllOrderByShop({ code_shop: code_shop, type: type, page: Number(page) || 1, value_search: value_search }, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            if (result.rows && result.rows.length !== 0) {
              if (type === 'all') {
                res.json({
                  data: result.rows,
                });
              } else {
                const dataPaging = {
                  count: Number(data_count.rows[0].count) || 0,
                  rows: result.rows,
                };
                const { tutorials, totalItems, totalPages, currentPage } = getPagingData(dataPaging, Number(page) || 1, 10);
                res.json({
                  page: page,
                  totalItems,
                  totalPages,
                  currentPage,
                  data: result.rows,
                });
              }
            } else if (result.rows.length === 0) {
              res.status(203).json({
                status: 203,
                message: 'Không có đơn hàng ',
              });
            } else {
              res.json({
                message: 'Lỗi',
              });
            }
          }
        }
      });
    } else {
      res.json({
        error: 'Not data user',
      });
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const getAllProductByOrderAndShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    if (data_user) {
      const code_shop = data_user?.payload.code_shop;
      await OrderModel.getAllProductByOrderAndShop({ code_shop }, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            if (result.rows.length !== 0) {
              res.json({
                data: result.rows,
              });
            } else if (result.rows.length === 0) {
              res.json({
                message: 'Không có dữ liệu ',
              });
            } else {
              res.json({
                message: 'Lỗi',
              });
            }
          }
        }
      });
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const getOrderDetailByOrderAndShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    if (data_user) {
      const dataSQL = {
        code_shop: data_user.payload.code_shop,
        code_order: (req.query.code_order as string) || '',
      };
      await OrderModel.getOrderDetailByOrderAndShop(dataSQL, (err, result) => {
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
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
export const removeOrderByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL: RemoveOrderByShopTp = {
      code_order: req.query.code_order as string,
      code_shop: data_user?.payload.code_shop,
      code_order_arr: req.query.code_order_arr as any,
    };
    await OrderModel.removeOrderByShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount === 1) {
            res.json({
              message: 'Xóa đơn hàng thành công ',
            });
          } else if (result.rowCount === 0) {
            res.json({
              message: 'Xóa đơn hàng không thành công ',
            });
          } else {
            res.json({
              message: 'Lỗi',
            });
          }
        }
      }
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
export const confirmOrderByCodeOrder = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    if (data_user) {
      const { code_order } = req.query;
      const { value } = req.body;
      const dataSQL = {
        code_shop: data_user.payload.code_shop,
        code_order: (code_order as string) || '',
        value: value,
      };
      console.log('data SQL : ', dataSQL);
      await OrderModel.confirmOrderByCodeOrderModel(dataSQL, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            if (result.rowCount > 0) {
              res.json({
                message: 'Cập nhật thành công ',
              });
            } else {
              res.json({
                message: 'Cập nhật không thành công ',
              });
            }
          }
        }
      });
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
