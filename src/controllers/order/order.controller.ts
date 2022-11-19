import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import { getPagingData } from "../../libs/getPagination";
import { getDataUser } from "../../libs/getUserToken";
import { OrderModel } from "../../models/order/order.model";
import { DataGetOrdeDetailByUser, OrderGetByUserData } from "../../types/order/order";
import { GetOrderDetailByCodeOrder } from "../../types/schemas/authSchema.type";
import { verifyJWT } from "../../utils/jwt/jwt-token";

export const getOrderByUser = async (req: Request, res: Response) => {
  const { page } = req.query
  console.log("Page : ", page)
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    if (token && bearer === 'jwt') {
      const user = verifyJWT(token, config.refresh_token_secret as string) as JwtPayload;
      delete user.payload.password;
      delete user.payload.verification_code;
      delete user.payload.passwordResetCode;

      const dataSQL: OrderGetByUserData = {
        codeUser: user.payload.code_user || '',
        page: page as string || '1',
      }
      const dataCount = await OrderModel.getCountOrderByUserModel(dataSQL)
      await OrderModel.getOrderByUserModel(dataSQL, (err, result) => {
        if (err) {
          res.json({
            error: err
          })
        }
        else {
          if (result) {
            const dataPaging = {
              count: Number(dataCount.rows[0].count || 0),
              rows: result.rows
            }
            const { tutorials, totalItems, totalPages, currentPage }
              = getPagingData(dataPaging, Number(page) || 0, Number(config.order_user_limit_show) || 10)
            res.json({
              totalItems,
              totalPages,
              currentPage: Number(page),
              limit: Number(config.order_user_limit_show),
              data: tutorials
            })
          }
        }
      })
    }

  } catch (err) {
    res.json({
      error: "error"
    })
  }

}

export const getOrderDetailByCodeOrder = async (req: Request, res: Response) => {
  try {
    const { code_order } = req.query
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const resultUser = getDataUser(token, bearer)
    const dataSQL: DataGetOrdeDetailByUser = {
      code_order: code_order as string || '',
      code_user: resultUser?.payload.code_user
    }
    await OrderModel.getOrderDetailByUser(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          if (result.rowCount === 0 || result.rows.length === 0) {
            res.json({
              data: [],
              message: "Không có sản phẩm"
            })
          }
          else {
            res.json({
              data: result.rows
            })
          }

        }
      }
    })
  } catch (err) {
    res.json({
      error: "error"
    })
  }
}
