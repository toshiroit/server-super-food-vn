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
      error: error
    })
  }
};
const getMe = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers;
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    if (token && bearer === 'jwt') {
      const user = verifyJWT(token, config.refresh_token_secret as string) as JwtPayload;
      delete user.payload.password;
      delete user.payload.verification_code;
      delete user.payload.passwordResetCode;
      res.json({
        data: user,
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
      error: "error"
    })
  }
};
const SendCodePhone = async (req: Request<{}, {}, PhoneSendCodeAuth>, res: Response) => {
  try {
    const data = {
      phone: req.body.phone,
      capCha: GetCAPTCHACode(),
    };
    let isPhone = false;
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
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  // res.setHeader('Set-Cookie', 'visited=true; Max-Age=3000; HttpOnly, Secure');
  console.log(req.body)
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
        status: false,
        full_name: req.body.fullName as string || '',
        sex: false,
        code_restpass: makeId(14),
        createdAtDetail: new Date(Date.now()).toISOString()
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
            expires: new Date(Date.now() + 900000),
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
          } else if (result?.command) {
            res.json({
              message: result
            })
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
const registerUser = async (req: Request<{}, {}, RegisterAuth>, res: Response, next: NextFunction) => {
  try {
    const valueQuery: modelQuery = {
      table: 'user_sp',
      obj: {
        condition: null,
      },
      field: null,
      value: [
        makeId(14),
        hasPassword('chanelnam2020'),
        'ROLE-WIXO-USER',
        req.body.phone,
        new Date(Date.now()).toISOString(),
        false,
      ],
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
const verifyAuthMailer = async (req: Request<VerifyAuth>, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;
  const valueQuery: modelQuery = {
    table: 'users',
    obj: {
      condition: null,
    },
    field: 'id',
    value: [Number(id), verificationCode],
  };
  AuthModel.verifyAuthMailerModel(valueQuery, (err, result) => {
    if (err) {
      res.status(400).json({
        message: 'Error',
      });
    } else {
      if (!result?.rows || result?.rows.length === 0) {
        res.status(203).json({
          status: 203,
          message: 'Error account verify code',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: result.rows,
        });
      }
    }
  });
};
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
    const { user_name, password } = req.body
    const dataSQL: AuthLoginAdmin = {
      user_name: user_name,
      password: password
    }
    const dataUserModel = await AuthModel.getUserAdminModel(dataSQL)
    if (dataUserModel.rows.length > 0) {
      const isPassword = comparePassword(password, dataUserModel.rows[0].password.trim())
      if (isPassword) {
        delete dataUserModel.rows[0].password
        delete dataUserModel.rows[0].passwordResetCode
        delete dataUserModel.rows[0].refresh_token
        delete dataUserModel.rows[0].verification_code
        const tokens = jwtTokens(dataUserModel.rows[0])
        res.cookie('jwt', tokens.refreshToken, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
          path: '/',
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'strict'
        })
        res.json({
          token: tokens.accessToken,
          message: "Đăng nhập thành công ",
          data: dataUserModel.rows
        })
      }
      else {
        res.status(400).json({
          message: "Tên tài khoản hoặc mật khẩu không"
        })
      }
    }
    else {
      res.status(400).json({
        message: "Tên tài khoản hoặc mật khẩu không"
      })
    }
  } catch (err) {
    res.json({
      error: "Error"
    })
  }

}

export {
  loginUser,
  loginPhone,
  verifyAuthMailer,
  refreshToken,
  registerUser,
  getAllUsers,
  loginAuthAdmin,
  getMe,
  VerifyTokenUser,
  SendCodePhone,
  checkPhoneAuth,
  verifyCodeAuth,
};
