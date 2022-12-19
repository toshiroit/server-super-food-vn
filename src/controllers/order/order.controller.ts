import { SortOrder, StatusOrder } from './../../types/order/order';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config/config';
import { dataUserTK } from '../../libs/data_user';
import { getPagingData } from '../../libs/getPagination';
import { getDataUser } from '../../libs/getUserToken';
import { OrderModel } from '../../models/order/order.model';
import { DataGetOrdeDetailByUser, OrderGetByUserData } from '../../types/order/order';
import { GetOrderDetailByCodeOrder } from '../../types/schemas/authSchema.type';
import { verifyJWT } from '../../utils/jwt/jwt-token';

export const getOrderByUser = async (req: Request, res: Response) => {
  const { page } = req.query;
  try {
    const data_user = await dataUserTK(req);
    const dataSQL: OrderGetByUserData = {
      codeUser: data_user?.payload.code_user || '',
      page: (page as string) || '1',
      text_search: req.query.text_search as string,
      status_order: req.query.status_order as string,
      date_start: req.query.date_start as string,
      date_end: req.query.date_end as string,
      sort_order: req.query.sort_order,
    };
    const dataCount = await OrderModel.getCountOrderByUserModel(dataSQL);
    await OrderModel.getOrderByUserModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          const dataPaging = {
            count: Number(dataCount.rows[0].count || 0),
            rows: result.rows,
          };
          const { tutorials, totalItems, totalPages, currentPage } = getPagingData(dataPaging, Number(page) || 0, Number(config.order_user_limit_show) || 10);
          res.json({
            totalItems,
            totalPages,
            currentPage: Number(page),
            limit: Number(config.order_user_limit_show),
            data: tutorials,
          });
        }
      }
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const confirmOrderSuccessUser = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL = {
      code_user: data_user?.payload.code_user,
      code_order: (req.query.code_order as string) || '',
    };
    OrderModel.confirmOrderSuccessUserModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              message: 'Cập nhật thành công',
            });
          } else {
            res.status(400).json({
              message: 'Cập nhật không thành công',
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

export const getOrderDetailByCodeOrder = async (req: Request, res: Response) => {
  try {
    const { code_order } = req.query;
    const resultUser = await dataUserTK(req);
    const dataSQL: DataGetOrdeDetailByUser = {
      code_order: (code_order as string) || '',
      code_user: resultUser?.payload.code_user,
    };
    await OrderModel.getOrderDetailByUser(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount === 0 || result.rows.length === 0) {
            res.json({
              data: [],
              message: 'Không có sản phẩm',
            });
          } else {
            res.json({
              data: result.rows,
            });
          }
        }
      }
    });
  } catch (err) {
    res.json({
      error: 'error',
    });
  }
};
