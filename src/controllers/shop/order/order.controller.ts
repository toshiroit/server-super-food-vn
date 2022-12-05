import { Request, Response } from 'express';
import { getPagingData } from '../../../libs/getPagination';
import { getDataUser } from '../../../libs/getUserToken';
import { OrderModel } from '../../../models/shop/order/order.model';
import { HideOrderByShopTypeZod } from '../../../schemas/shop/order/order.schema';
import { HideOrderByShopTp, RemoveOrderByShopTp } from '../../../types/shop/order/order';
export const dataUserTK = (req: Request) => {
  const { cookie } = req.headers;
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer);
  return data_user;
};
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
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer);
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
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer);
    if (data_user) {
      const code_shop = data_user?.payload.code_shop;
      const type = req.query.type;
      const page = req.query.page;
      const data_count = await OrderModel.getCountOrderByShop({ code_shop: code_shop, type: type });
      await OrderModel.getAllOrderByShop({ code_shop: code_shop, type: type }, (err, result) => {
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
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer);
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
    const data_user = dataUserTK(req);
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
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer);
    const dataSQL: RemoveOrderByShopTp = {
      code_order: req.query.code_order as string,
      code_shop: data_user?.payload.code_shop,
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
    const data_user = dataUserTK(req);
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
