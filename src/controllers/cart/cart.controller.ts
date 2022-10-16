import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import { modelQuery } from "../../interfaces/model_query/modelQuery";
import { CartModel } from "../../models/cart/cart.model";
import { RemoveCart } from "../../types/schemas/authSchema.type";
import { verifyJWT } from "../../utils/jwt/jwt-token";

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
