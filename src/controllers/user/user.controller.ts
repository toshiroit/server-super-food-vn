import { CallbackHandler } from './../../interfaces/model_query/modelQuery';
import { QueryResult } from 'pg';
import { Request, Response, NextFunction } from 'express';
import { modelQuery } from '../../interfaces/model_query/modelQuery';
import UserModel from '../../models/user/user.model';
import sendEmail from '../../utils/mail/mailer';

export class UserController extends UserModel {
  public static registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {}
  };

  public static createUser = async (req: Request, res: Response, next: NextFunction) => {};

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns => return json
   */
  public static getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const valueQuery: modelQuery = {
        table: 'users',
        obj: {
          condition: null,
        },
        field: null,
        value: [],
      };

      // await UserModel.getAllNoField(valueQuery, (err, result) => {
      //   if (err) {
      //     res.json({ error: err });
      //   } else {
      //     res.json({ data: result?.rows });
      //   }
      // });
    } catch (error) {
      throw new Error('Error');
    }
  };
}
