import { Request, Response } from "express";
import { getDataUser } from "../../../libs/getUserToken";
import { OrderModel } from "../../../models/shop/order/order.model";
import { HideOrderByShopTypeZod } from "../../../schemas/shop/order/order.schema";
import { HideOrderByShopTp, RemoveOrderByShopTp } from "../../../types/shop/order/order";

export const addOrderByShop = async (req: Request, res: Response) => {
  try {
    res.json({
      message: "TEST"
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}

export const hideOrderByShop = async (req: Request<any, any, HideOrderByShopTypeZod>, res: Response) => {
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const dataSQL: HideOrderByShopTp = {
      code_order: req.body.code_order,
      is_show: req.body.is_show,
      code_shop: data_user?.payload.code_shop
    }
    await OrderModel.hideOrderByShop(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          if (result.rowCount === 1) {
            res.json({
              message: "Ẩn đơn hàng thành công "
            })
          }
          else if (result.rowCount === 0) {
            res.json({
              message: "Ẩn đơn hàng không thành công "
            })
          }
          else {
            res.json({
              message: 'Lỗi'
            })
          }
        }
      }
    })
    res.json({
      message: "TEST"
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}

export const getAllOrderByShop = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    if (data_user) {
      const code_shop = data_user?.payload.code_shop
      await OrderModel.getAllOrderByShop({ code_shop: code_shop }, (err, result) => {
        if (err) {
          res.json({
            error: err
          })
        }
        else {
          if (result) {
            if (result.rows && result.rows.length !== 0) {
              res.json({
                data: result.rows
              })
            }
            else if (result.rows.length === 0) {
              res.status(203).json({
                status: 203,
                message: "Không có đơn hàng "
              })
            }
            else {
              res.json({
                message: "Lỗi"
              })
            }
          }
        }
      })
    }
    else {
      res.json({
        error: "Not data user"
      })
    }
  } catch (err) {
    res.json({
      error: err
    })
  }
}

export const getAllProductByOrderAndShop = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    if (data_user) {
      const code_shop = data_user?.payload.code_shop
      await OrderModel.getAllProductByOrderAndShop({ code_shop }, (err, result) => {
        if (err) {
          res.json({
            error: err
          })
        }
        else {
          if (result) {
            if (result.rows.length !== 0) {
              res.json({
                data: result.rows
              })
            }
            else if (result.rows.length === 0) {
              res.json({
                message: 'Không có dữ liệu '
              })
            }
            else {
              res.json({
                message: 'Lỗi'
              })
            }
          }
        }
      })
    }
  } catch (err) {
    res.json({
      error: err
    })
  }
}

export const removeOrderByShop = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const data_user = getDataUser(token, bearer)
    const dataSQL: RemoveOrderByShopTp = {
      code_order: req.query.code_order as string,
      code_shop: data_user?.payload.code_shop
    }
    await OrderModel.removeOrderByShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          if (result.rowCount === 1) {
            res.json({
              message: "Xóa đơn hàng thành công "
            })
          }
          else if (result.rowCount === 0) {
            res.json({
              message: "Xóa đơn hàng không thành công "
            })
          }
          else {
            res.json({
              message: 'Lỗi'
            })
          }
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}
