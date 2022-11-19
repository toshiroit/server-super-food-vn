import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import { modelQuery } from "../../interfaces/model_query/modelQuery";
import { getDataUser } from "../../libs/getUserToken";
import { CartModel } from "../../models/cart/cart.model";
import { RemoveCart } from "../../types/schemas/authSchema.type";
import { verifyJWT } from "../../utils/jwt/jwt-token";

const dataUserTK = (req: Request) => {
  const { cookie } = req.headers
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer)
  return data_user;
}
export const getCart = async (req: Request, res: Response) => {
  try {
    await CartModel.getCartModel(req.query.code_user as string, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        res.json({
          mess: 'suceess',
          data: result
        })
      }
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}
export const addCartByCodeUser = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    if (token && bearer === 'jwt') {
      const user = verifyJWT(token, config.refresh_token_secret as string) as JwtPayload;
      const dataQuery: modelQuery = {
        table: 'cart_sp',
        condition: null,
        field: null,
        value: [req.body, user.payload.code_user],
        obj: {
          condition: null
        }
      }
      try {
        CartModel.addCartByCodeUserModel(dataQuery, (err, result) => {
          if (err) {
            if (err.code === '23505') {
              res.json({
                message: 'Sản phẩm trong giỏ hàng đã tồn tại '
              })
            }
            res.json({
              error: err
            })
          } else {
            res.json({
              data: result
            })
          }
        })

      } catch (err) {
        res.json({
          error: err
        })
      }

    } else {
      res.json({
        error: 'ERROR NOT FOUND JWT',
      });
    }

  } catch (err) {
    res.json({
      error: err
    })
  }
}

export const removeCart = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    if (token && bearer === 'jwt') {
      const user = verifyJWT(token, config.refresh_token_secret as string) as JwtPayload;
      const dataQuery: modelQuery = {
        table: 'cart_sp',
        condition: null,
        field: null,
        value: [req.query.code_cart, user.payload.code_user],
        obj: {
          condition: null
        }
      }
      try {
        CartModel.removeCartByCodeCartModel(dataQuery, ((err, result) => {
          if (err) {
            res.json({
              error: err
            })
          }
          else {
            if (result?.rowCount) {
              res.json({
                message: result
              })
            }
          }
        }))

      } catch (err) {
        res.json({
          error: err
        })
      }

    } else {
      res.json({
        error: 'ERROR NOT FOUND JWT',
      });
    }

  } catch (err) {
    res.json({
      error: err
    })
  }
}
export const removeCartByCode = async (req: Request, res: Response) => {
  try {
    const data = dataUserTK(req)
    const dataSQL = {
      code_user: data?.payload.code_user,
      code_product: JSON.parse(req.query.code_product as string || '')
    }
    CartModel.removeCartByCodeProduct(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              message: 'Xóa sản phẩm trong giỏ hàng thành công'
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
