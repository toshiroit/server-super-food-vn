import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config/config';
import UserModel from '../../models/user/user.model';
import { UserUpdateW1Info, UserUpdateW1InfoIO } from '../../types/user/user';
import { verifyJWT } from '../../utils/jwt/jwt-token';


export const updateUser = async (req: Request<{}, {}, UserUpdateW1Info>, res: Response) => {
  try {

    const { cookie } = req.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    let dataUser = null;
    if (token && bearer === 'jwt') {
      dataUser = verifyJWT(token, config.refresh_token_secret as string) as JwtPayload;
      delete dataUser.payload.password;
      delete dataUser.payload.verification_code;
      delete dataUser.payload.passwordResetCode;
    }
    const data: UserUpdateW1Info & UserUpdateW1InfoIO = {
      fullName: req.body.fullName,
      sex: req.body.sex,
      date: req.body.date,
      dataUserLogin: dataUser
    }
    await UserModel.updateUserW1(data, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      }
      else {
        if (result) {
          if (result.rowCount === 1) {
            res.json({
              command: result.command,
              message: "Cập nhật thành công"
            })
          } else {
            res.json({
              command: result.command,
              message: "Cập nhật không thành công"
            })
          }
        }
      }
    })
  } catch (err) {
    res.json({
      error: "Error"
    })
  }
}

