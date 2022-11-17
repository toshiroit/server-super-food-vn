import { Request, Response } from "express";
import { hasPassword } from "../../../libs/hash_password";
import { makeId } from "../../../libs/make_id";
import { AuthModel } from "../../../models/shop/auth/auth.model";
import { AuthRegisterShop } from "../../../schemas/shop/auth/auth.schema";
import { AuthRegisterShopTP } from "../../../types/shop/auth/auth";

export const authReister = async (req: Request<any, any, AuthRegisterShop>, res: Response) => {
  try {
    const dataRegister: AuthRegisterShopTP = {
      code_user: makeId(15),
      code_user_detail: makeId(15),
      code_shop_detail: makeId(15),
      code_shop: makeId(15),
      password: hasPassword(req.body.password),
      code_role: 'ROLE-WIXX-SHOP',
      phone: req.body.phone,
      username: req.body.username,
      createdAt: new Date(Date.now()).toISOString(),
      status: false,
      full_name: req.body.name,
      sex: req.body.gender === 1 ? false : true,
      code_restpass: makeId(15),
      date_birth: req.body.birth_date,
      code_address: makeId(15),
      detail_address: '',
      status_address: false,
      code_address_detail: makeId(15),
      phone_w: req.body.phone_shop,
      name_shop: req.body.name_shop,
      email: req.body.email,
      street: '',
      village: '',
      district: '',
      province: '',
      city: ''
    }
    const dataCheckRegister = {
      user_name: req.body.username,
      phone: req.body.phone
    }
    const dataRegisterShopSQL = [
      dataRegister.code_user,
      dataRegister.code_user_detail,
      '',
      dataRegister.username,
      dataRegister.password,
      dataRegister.code_role,
      dataRegister.phone,
      dataRegister.createdAt,
      dataRegister.status,
      dataRegister.full_name,
      dataRegister.sex,
      dataRegister.code_restpass,
      dataRegister.date_birth,
      dataRegister.createdAt,
      dataRegister.code_address,
      dataRegister.full_name,
      dataRegister.phone,
      dataRegister.detail_address,
      dataRegister.status_address,
      dataRegister.code_user_detail,
      dataRegister.phone_w,
      dataRegister.email,
      dataRegister.street,
      dataRegister.village,
      dataRegister.district,
      dataRegister.province,
      dataRegister.city,
      dataRegister.code_shop,
      dataRegister.name_shop,
      dataRegister.code_shop_detail,
    ]
    const dataUser = await AuthModel.authCheckUser(dataCheckRegister)
    console.log(dataUser.rows)
    if (dataUser.rows) {
      const countUser = dataUser.rows[0].count
      if (countUser) {
        if (Number(countUser) === 0) {
          await AuthModel.authRegisterModel(dataRegisterShopSQL, (err, result) => {
            if (err) {
              res.json({
                error: err
              })
            }
            else {
              if (result) {
                if (result.rowCount === 1) {
                  res.json({
                    message: 'Đăng kí tài khoản thành công'
                  })
                }
              }
            }
          })
        }
        else {
          res.json({
            status: 203,
            message: 'Tài khoản đã được đăng kí'
          })
        }
      }

    }

  } catch (err) {
    res.json({
      error: err
    })
  }
}
