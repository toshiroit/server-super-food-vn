import { Request, Response } from 'express';
import config from '../../../config/config';
import { sendMail } from '../../../helpers/mail';
import { getDataUser } from '../../../libs/getUserToken';
import { comparePassword, hasPassword } from '../../../libs/hash_password';
import { makeId } from '../../../libs/make_id';
import { timeVietNameYesterday } from '../../../libs/timeVietNam';
import { AuthModel } from '../../../models/shop/auth/auth.model';
import { AuthRegisterShop } from '../../../schemas/shop/auth/auth.schema';
import { UserDataUpdate } from '../../../types/auth/auth.type';
import { AuthRegisterShopTP } from '../../../types/shop/auth/auth';

const dataUserTK = (req: Request) => {
  const { cookie } = req.headers;
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer);
  return data_user;
};

export const authUpdateUserByShop = async (req: Request, res: Response) => {
  try {
    const data_user = dataUserTK(req)?.payload;
    const dataSQL: UserDataUpdate = req.body;
    dataSQL.code_shop = data_user.code_shop;
    await AuthModel.authUpdateUserByShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          res.json({
            message: result.rows[0],
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

export const getCodeVerificationAccount = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    if (username) {
      const dataVerification = await AuthModel.authGetVerificationCodeByUserName({ user_name: (username as string) || '' });
      if (dataVerification.rows.length > 0 && dataVerification.rows[0] && dataVerification.rows[0].verification_code && dataVerification.rows[0].email) {
        const adata = await sendMail({
          from: config.node_mailer_user,
          to: dataVerification.rows[0].email,
          subject: `Xác thực tài khoản của bạn ${username} - ${timeVietNameYesterday()}`,
          html: `Mã xác nhận tài khoản của bạn ${username} là : <b>${dataVerification.rows[0].verification_code}</b>`,
        });
        res.json({
          data: adata,
          message: 'Thành công',
        });
      }
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const activeAccountRegister = async (req: Request, res: Response) => {
  const { verification_code, user_name } = req.body;
  try {
    const dataSQLActive = {
      user_name,
      verification_code,
    };
    const data_check = await AuthModel.authCheckVerificationCode(dataSQLActive);
    if (data_check.rows[0] && data_check.rows[0].count > 0) {
      const data_isCheck = await AuthModel.authIsCheckVerification(dataSQLActive);
      console.log('CHECK ', data_isCheck.rows);
      if (data_isCheck.rows[0] && data_isCheck.rows[0].count === '0') {
        await AuthModel.authActiveAccountShopByUser({ user_name: dataSQLActive.user_name }, (err, result) => {
          if (err) {
            res.json({
              error: err,
            });
          } else {
            if (result && result.rowCount > 0) {
              res.json({
                message: 'Kích hoạt thành công',
              });
            } else {
              res.status(400).json({
                message: 'Kích hoạt không thành công',
              });
            }
          }
        });
      } else {
        res.status(400).json({
          code: 123,
          message: 'Tài khoản nãy đã được kích hoạt',
        });
      }
    } else {
      res.status(400).json({
        message: 'Tải khoản không tồn tại hoặc mã kích hoạt không tòn tại ',
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const authRegister = async (req: Request<unknown, unknown, AuthRegisterShop>, res: Response) => {
  try {
    const dataRegister: AuthRegisterShopTP = {
      code_user: makeId(15),
      code_user_detail: makeId(15),
      code_shop_detail: makeId(15),
      code_type_login: req.body.type_login === 1 ? 'CHECK-LOGIN-P' : req.body.type_login === 2 ? 'CHECK-LOGIN-E' : req.body.type_login === -1 ? null : null,
      verification_code: makeId(50),
      avatar: req.body.avatar,
      code_shop: makeId(15),
      password: hasPassword(req.body.password),
      code_role: 'ROLE-WIXX-SHOP',
      phone: req.body.phone,
      username: req.body.username,
      createdAt: new Date(Date.now()).toISOString(),
      status: -1,
      full_name: req.body.full_name,
      sex: req.body.gender === 1 ? false : true,
      code_restpass: makeId(15),
      date_birth: req.body.birth_date,
      code_address: makeId(15),
      detail_address: req.body.detail_address,
      status_address: false,
      code_address_detail: makeId(15),
      phone_w: req.body.phone_shop,
      name_shop: req.body.name_shop,
      email: req.body.email,
      street: req.body.street,
      village: req.body.village,
      district: req.body.district,
      city: req.body.city,
      description: req.body.description,
    };
    const dataCheckRegister = {
      user_name: req.body.username,
      phone: req.body.phone,
    };
    const dataRegisterShopSQL = [
      dataRegister.code_user, //1
      dataRegister.code_user_detail, //2
      dataRegister.avatar, //3
      dataRegister.username, //4
      dataRegister.password, //5
      dataRegister.code_role, //6
      dataRegister.phone, //7
      dataRegister.createdAt, //8
      dataRegister.status, //9
      dataRegister.verification_code, //10
      dataRegister.code_type_login, //11
      dataRegister.full_name, //12
      dataRegister.sex, //13
      dataRegister.code_restpass, //14
      dataRegister.date_birth, //15
      dataRegister.createdAt, //16
      dataRegister.code_address, //17
      dataRegister.full_name, //18
      dataRegister.phone, //19
      dataRegister.detail_address, //20
      dataRegister.status_address, //21
      dataRegister.code_address_detail, //22
      dataRegister.phone_w, //23
      dataRegister.email, //24
      dataRegister.street, //25
      dataRegister.village, //26
      dataRegister.district, //27
      dataRegister.city, //28
      dataRegister.code_shop, //29
      dataRegister.name_shop, //30
      dataRegister.code_shop_detail, //31
      dataRegister.description, // 32
    ];
    const dataUser = await AuthModel.authCheckUser(dataCheckRegister);
    if (dataUser.rows) {
      const countUser = dataUser.rows[0].count;
      if (countUser) {
        if (Number(countUser) === 0) {
          await AuthModel.authRegisterModel(dataRegisterShopSQL, (err, result) => {
            if (err) {
              res.json({
                error: err,
              });
            } else {
              if (result) {
                if (result.rowCount === 1) {
                  sendMail({
                    from: config.node_mailer_user,
                    to: dataRegister.email,
                    subject: `Xác thực tài khoản của bạn ${dataRegister.username} - ${timeVietNameYesterday()}`,
                    html: `Mã xác nhận tài khoản của bạn ${dataRegister.username} là <b>${dataRegister.verification_code}</b>`,
                  });
                  res.json({
                    message: 'Đăng kí tài khoản thành công',
                  });
                }
              }
            }
          });
        } else {
          res.status(400).json({
            status: 400,
            error_type: 1,
            message: 'Tài khoản hoặc số điện thoại đã được đăng kí',
          });
        }
      }
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const authCheckPasswordByUserShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL = {
      code_shop: data_user?.payload.code_shop,
      user_name: data_user?.payload.user_name,
      password: req.query.password,
    };
    await AuthModel.authCheckPasswordByShop(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          const password_user = result.rows[0].password;
          const isPassword = comparePassword(dataSQL.password as string, password_user.trim() || '');
          if (isPassword) {
            res.json({
              message: 'Mật khẩu chính xác',
            });
          } else {
            res.status(400).json({
              message: 'Mật khẩu không chính xác',
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
