import jwt, { JwtPayload } from 'jsonwebtoken';
import { modelQuery } from './../../interfaces/model_query/modelQuery';
import { NextFunction, Request, Response } from 'express';
import { AuthModel } from './../../models/auth/auth.model';
import { RegisterAuth, VerifyAuth } from '../../schemas/auth/auth.schema';
import config from '../../config/config';
import { LoginAuth, PhoneSendCodeAuth } from '../../types/schemas/authSchema.type';
import { jwtTokens, verifyJWT } from '../../utils/jwt/jwt-token';
import { makeId } from '../../libs/make_id';
import { comparePassword, hasPassword } from '../../libs/hash_password';
import { AuthLoginAdmin, CheckCodeAuth, CheckPhoneAuth } from '../../types/auth/auth.type';
import { GetCAPTCHACode } from '../../libs/capcha_number';
import { getDataUser } from '../../libs/getUserToken';
import nodemailer from 'nodemailer';
import { sendMail } from '../../helpers/mail';
import { RegisterSuccess } from '../../libs/theme_mailer';
import { endtenMinute, timeVietNameYesterday } from '../../libs/timeVietNam';
import { dataUserTK } from '../../libs/data_user';
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const valueQuery: modelQuery = {
      table: 'users',
      field: '',
      obj: {
        condition: null,
      },
      value: [],
    };
    await AuthModel.getAllNoField(valueQuery, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        res.json({
          data: result,
        });
      }
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getMe = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    if (token && bearer === 'jwt') {
      const user = (await verifyJWT(token, config.refresh_token_secret as string)) as JwtPayload;

      await AuthModel.getMeUser({ code_user: user.payload.code_user }, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            const data_user = result.rows[0];
            delete data_user.password;
            res.json({
              data: result.rows,
            });
          }
        }
      });
    } else {
      res.json({
        error: '12412',
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
  // console.log(authorization);
};
const loginPhone = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    cookie: res.cookie,
    data: res.locals,
  });
  // await AuthModel.loginUserModel();
};

const checkCodeOTP = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    const is_check = await AuthModel.checkCodeModel({ code: (code as string) || '', time: timeVietNameYesterday() });
    if (is_check.rows.length > 0) {
      const is_otp = comparePassword((code as string) || '', (is_check.rows[0]?.otp_text as string) || '');
      if (is_otp) {
        const is_disable = await AuthModel.disableCodeModelByCode({ code: is_check.rows[0]?.code_otp || '' });
        if (is_disable.rowCount > 0) {
          res.status(200).json({
            message: 'Xác nhận thành công ',
          });
        }
      } else {
        res.status(400).json({
          message: 'Mã xác nhận không chính xác ',
        });
      }
    } else {
      res.status(400).json({
        message: 'Mã xác nhận không chính xác ',
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const VerifyTokenUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization');
    const authorization = req.headers.authorization;
    if (authorization) {
      const reqValueLogin: LoginAuth = {
        phone: req.body.phone,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation,
      };
      const valueQuery: modelQuery = {
        table: 'users',
        value: reqValueLogin,
        field: null,
        obj: {
          condition: null,
        },
      };
    }
  } catch (error) {
    res.json({
      error: 'error',
    });
  }
};
// eslint-disable-next-line @typescript-eslint/ban-types
const SendCodePhone = async (req: Request<{}, {}, PhoneSendCodeAuth>, res: Response) => {
  try {
    const capCha_hash = GetCAPTCHACode();
    const data = {
      phone: req.body.phone,
      code: makeId(15),
      capCha: capCha_hash,
      data_hash: hasPassword(capCha_hash),
      createdAt: timeVietNameYesterday(),
      endTime: endtenMinute(),
    };
    const is_check = await AuthModel.saveCodeModel(data);
    if (is_check.rowCount > 0) {
      await AuthModel.sendCodeModel(data, (err, result) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          res.status(200).json({
            message: 'Gửi mã thành công - vui lòng kiểm tra ',
          });
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  // res.setHeader('Set-Cookie', 'visited=true; Max-Age=3000; HttpOnly, Secure');
  try {
    const valueQuery: modelQuery = {
      table: 'users',
      value: {
        code_user: makeId(14).toUpperCase(),
        code_user_detail: makeId(14).toUpperCase(),
        password: req.body.password,
        role: 'ROLE-WIAO-ADMIN',
        phone: req.body.phone,
        hashPassword: hasPassword(req.body.password),
        createdAt: new Date(Date.now()).toISOString(),
        status: 0,
        full_name: (req.body.fullName as string) || '',
        sex: false,
        code_restpass: makeId(14),
        createdAtDetail: new Date(Date.now()).toISOString(),
        email: req.body.email,
        verification_code: makeId(50),
      },
      field: null,
      obj: {
        condition: null,
      },
    };
    await AuthModel.loginUserModel(valueQuery, (err, result) => {
      if (err) {
        res.status(401).json({
          error: err.message,
        });
      } else {
        if (result?.rows[0]) {
          delete result.rows[0].password;
          delete result.rows[0].passwordResetCode;
          delete result.rows[0].refresh_token;
          delete result.rows[0].verification_code;
          const tokens = jwtTokens(result.rows[0]);
          res.cookie('jwt', tokens.refreshToken, {
            expires: new Date(Date.now() + 12000),
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict',
          });
          res.json({
            token: tokens.accessToken,
            data: result.rows[0],
          });
        } else {
          if (result?.command === 'INSERT') {
            const data_sendMaik = sendMail({
              from: config.node_mailer_user,
              to: valueQuery.value.email,
              subject: `Đăng kí tài khoản thành công - ${timeVietNameYesterday()}`,
              html: RegisterSuccess(valueQuery.value.verification_code, (config.domain_web_client as string) || ''),
            });
            data_sendMaik
              .then(result2 => {
                if (result2) {
                  if (result2.response) {
                    if (result.rowCount === 1) {
                      res.status(200).json({
                        status: 200,
                        message: 'Đăng kí tài khoản thành công ',
                      });
                    } else {
                      res.status(400).json({
                        status: 400,
                        message: 'Đăng kí tài khoản không thành công ',
                      });
                    }
                  }
                }
              })
              .catch(err => {
                res.json({
                  error: err,
                });
              });
          } else if (result?.command) {
            res.json({
              message: result,
            });
          } else {
            res.status(401).json({
              message: 'Tài khoản hoặc mật khẩu không chính xác ',
            });
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};
/**
 *
 * @param req body none
 * @param res
 * @description logout user remove token server
 */
export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt');
    res.json({
      message: 'Đăng xuất thành công ',
    });
  } catch (error) {
    res.json({
      message: 'Đăng xuất thành công không thành công ',
    });
  }
};
/**
 *
 * @param req
 * @param res
 * @returns Rest token new
 */
const refreshToken = async (req: Request, res: Response) => {
  const refresh_token = req.cookies.jwt;
  try {
    if (!refresh_token) return res.status(401).json({ error: 'error' });
    jwt.verify(refresh_token as string, config.refresh_token_secret as string, (err, data: any) => {
      if (err) {
        res.status(401).json({
          error: err,
        });
      } else {
        res.status(200).json({
          data,
          refresh_token,
        });
      }
    });
  } catch (error) {
    res.json({
      error,
      token: refresh_token,
    });
  }
};
// eslint-disable-next-line @typescript-eslint/ban-types
const registerUser = async (req: Request<{}, {}, RegisterAuth>, res: Response, next: NextFunction) => {
  try {
    const valueQuery: modelQuery = {
      table: 'user_sp',
      obj: {
        condition: null,
      },
      field: null,
      value: [makeId(14), hasPassword('chanelnam2020'), 'ROLE-WIXO-USER', req.body.phone, new Date(Date.now()).toISOString(), false],
    };
    await AuthModel.registerUserModel(valueQuery, (err, result) => {
      if (err) {
        if (err.code === '23505') {
          res.status(400).json({
            message: 'Số điện thoại đã được đăng kí ',
          });
        } else {
          res.json({
            error: err,
          });
        }
      } else {
        res.status(200).json({ data: result });
      }
    });
  } catch (error) {
    console.log('Error', error);
  }
};

const verifyAccountByCode = async (req: Request, res: Response) => {
  const { code } = await req.query;
  res.json({
    code: code,
  });
};
// eslint-disable-next-line @typescript-eslint/ban-types
const checkPhoneAuth = async (req: Request<{}, {}, CheckPhoneAuth>, res: Response) => {
  try {
    const valueQuery: modelQuery = {
      table: 'user_sp',
      field: 'phone',
      value: [req.body.phone],
      condition: null,
      obj: {
        condition: null,
      },
    };
    AuthModel.checkPhone(valueQuery, (err, result) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        if (result?.rows.length === 0) {
          res.status(200).json({
            status: 200,
            data: result.rows.length,
            message: 'Phone not is register',
          });
        } else {
          res.status(200).json({
            status: 200,
            data: result?.rows.length,
            message: 'Phone register',
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error',
    });
  }
};
const verifyCodeAuth = async (req: Request, res: Response) => {
  res.json({
    message: 'OK',
  });
};

const loginAuthAdmin = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    const dataSQL: AuthLoginAdmin = {
      user_name: user_name,
      password: password,
    };
    const dataUserModel = await AuthModel.getUserAdminModel(dataSQL);
    const isCheckVerification = await AuthModel.checkLoginVerificationCode(dataSQL);
    const isCheckSecurity = await AuthModel.checkLoginSecuritySetting(dataSQL);
    if (dataUserModel.rows.length > 0) {
      const isPassword = comparePassword(password, dataUserModel.rows[0].password.trim());
      if (isPassword) {
        if (isCheckVerification.rows.length === 0) {
          if (!isCheckSecurity.rows[0].security_login) {
            delete dataUserModel.rows[0].password;
            delete dataUserModel.rows[0].passwordResetCode;
            delete dataUserModel.rows[0].refresh_token;
            delete dataUserModel.rows[0].verification_code;
            const tokens = jwtTokens(dataUserModel.rows[0]);
            res.cookie('jwt', tokens.refreshToken, {
              expires: new Date(Date.now() + 900000),
              httpOnly: true,
              path: '/',
              maxAge: 24 * 60 * 60 * 1000,
              sameSite: 'strict',
            });
            res.json({
              token: tokens.accessToken,
              message: 'Đăng nhập thành công ',
              data: dataUserModel.rows,
            });
          } else {
            res.status(400).json({
              type: -2,
              message: 'Xác thực tài khoản của bạn',
            });
          }
        } else {
          res.status(400).json({
            type: -1,
            message: 'Tải khoản của bạn chưa được kích hoạt',
          });
        }
      } else {
        res.status(400).json({
          message: 'Tên tài khoản hoặc mật khẩu không đúng',
        });
      }
    } else {
      res.status(400).json({
        message: 'Tên tài khoản hoặc mật khẩu không đúng',
      });
    }
  } catch (err) {
    res.json({
      error: 'Error',
    });
  }
};

const loginAuthAdmin2 = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    const dataSQL: AuthLoginAdmin = {
      user_name: user_name,
      password: password,
    };
    const dataUserModel = await AuthModel.getUserAdminModel(dataSQL);
    const isCheckVerification = await AuthModel.checkLoginVerificationCode(dataSQL);
    const isCheckSecurity = await AuthModel.checkLoginSecuritySetting(dataSQL);
    if (dataUserModel.rows.length > 0) {
      const isPassword = comparePassword(password, dataUserModel.rows[0].password.trim());
      if (isPassword) {
        if (isCheckVerification.rows.length === 0) {
          delete dataUserModel.rows[0].password;
          delete dataUserModel.rows[0].passwordResetCode;
          delete dataUserModel.rows[0].refresh_token;
          delete dataUserModel.rows[0].verification_code;
          const tokens = jwtTokens(dataUserModel.rows[0]);
          res.cookie('jwt', tokens.refreshToken, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict',
          });
          res.json({
            token: tokens.accessToken,
            message: 'Đăng nhập thành công ',
            data: dataUserModel.rows,
          });
        } else {
          res.status(400).json({
            type: -1,
            message: 'Tải khoản của bạn chưa được kích hoạt',
          });
        }
      } else {
        res.status(400).json({
          message: 'Tên tài khoản hoặc mật khẩu không đúng',
        });
      }
    } else {
      res.status(400).json({
        message: 'Tên tài khoản hoặc mật khẩu không đúng',
      });
    }
  } catch (err) {
    res.json({
      error: 'Error',
    });
  }
};

const getMeShop = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    const dataUser = getDataUser(token, bearer);
    if (dataUser) {
      const data = dataUser.payload;
      await AuthModel.getMeShopModel({ code_user: data.code_user.trim() || '' }, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            if (result.rows.length > 0) {
              res.json({
                data: result.rows,
              });
            } else {
              res.json({
                message: 'Lỗi hệ thông',
              });
            }
          }
        }
      });
    }
  } catch (err) {
    res.json({
      error: 'Error',
    });
  }
};

const authUpdatePassword = async (req: Request, res: Response) => {
  try {
    const { phone, password, new_password } = req.body;
    const data_user = await dataUserTK(req);
    const dataSQL_get = {
      code_user: data_user?.payload.code_user,
    };
    const dataUserModel = await AuthModel.getUserWModel(dataSQL_get);
    if (dataUserModel.rows && dataUserModel.rows.length > 0) {
      const isPassword = comparePassword(password, dataUserModel.rows[0].password?.trim());
      if (isPassword) {
        const dataSQLUpdate = {
          password: hasPassword(new_password),
          code_user: dataSQL_get.code_user,
        };
        AuthModel.authUpdatePassword(dataSQLUpdate, (err, result) => {
          if (err) {
            res.json({
              error: err,
            });
          } else {
            if (result) {
              if (result.rowCount > 0) {
                res.json({
                  message: 'Thay đổi thành công',
                });
              } else {
                res.status(400).json({
                  message: 'Lỗi',
                });
              }
            }
          }
        });
      } else {
        res.status(400).json({
          message: 'Mật khẩu gốc không chính xác',
        });
      }
    }
  } catch (error) {
    res.json({ error });
  }
};
const authRestPassword = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    const password = makeId(12);
    AuthModel.authRestPassword({ phone: (phone as string) || '', password: hasPassword(password) || '' }, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            AuthModel.sendNewPassModel({ new_password: password as string, phone: phone as string }, (err, result) => {
              if (err) {
                res.json({
                  error_new: err,
                });
              } else {
                res.json({
                  message: 'Thay đổi mật khẩu thành công',
                });
              }
            });
          } else {
            res.status(400).json({
              message: 'Thay đổi mật khẩu không thành công',
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
export {
  authRestPassword,
  getMeShop,
  loginUser,
  loginPhone,
  refreshToken,
  registerUser,
  getAllUsers,
  loginAuthAdmin,
  getMe,
  VerifyTokenUser,
  SendCodePhone,
  checkPhoneAuth,
  verifyCodeAuth,
  verifyAccountByCode,
  checkCodeOTP,
  authUpdatePassword,
  loginAuthAdmin2,
};
