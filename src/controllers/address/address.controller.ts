import { Request, Response } from "express";
import { getDataUser } from "../../libs/getUserToken";
import { AddressModel } from "../../models/address/address.model";
import { GetAddressByUser } from "../../types/address/address";

export const getAddressByUser = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const dataUser = getDataUser(token, bearer);
    if (dataUser) {
      const dataSQL: GetAddressByUser = {
        code_user: dataUser.payload.code_user
      }
      await AddressModel.getAddressByUserModel(dataSQL, (err, result) => {
        if (err) {
          res.json({
            error: err
          })
        }
        else {
          if (result) {
            res.json({
              data: result.rows
            })
          }
        }
      })
    }
  } catch (err) {
    res.json({
      error: "Error"
    })
  }
}
