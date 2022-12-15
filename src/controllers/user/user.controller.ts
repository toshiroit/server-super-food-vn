import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config/config';
import { dataUserTK } from '../../libs/data_user';
import UserModel from '../../models/user/user.model';
import { UserUpdateData, UserUpdateW1Info, UserUpdateW1InfoIO } from '../../types/user/user';
import { verifyJWT } from '../../utils/jwt/jwt-token';

export const updatePassword = async (req: Request, res: Response) => {
  // eslint-disable-next-line no-empty
  try {
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const data: UserUpdateData = {
      full_name: req.body.full_name,
      date: req.body.date,
      avatar: req.body.avatar,
      sex: req.body.sex,
      code_user: data_user?.payload.code_user,
    };
    await UserModel.updateUserW1(data, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount === 1) {
            res.json({
              command: result.command,
              message: 'Cập nhật thành công',
            });
          } else {
            res.json({
              command: result.command,
              message: 'Cập nhật không thành công',
            });
          }
        }
      }
    });
  } catch (err) {
    res.json({
      error: 'Error',
    });
  }
};
