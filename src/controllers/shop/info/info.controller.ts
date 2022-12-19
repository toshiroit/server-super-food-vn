import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { getPagingData } from '../../../libs/getPagination';
import { getDataUser } from '../../../libs/getUserToken';
import { InfoShopModel } from '../../../models/shop/info/info.model';

export const shopInfoDetailByCodeShop = async (req: Request, res: Response) => {
  try {
    const { code_shop } = req.query;
    const data_user = await dataUserTK(req);
    const code_user = data_user?.payload.code_user || null;
    await InfoShopModel.getDetailShopInfoByCodeShop(
      {
        code_shop: (code_shop as string) || '',
        code_user: code_user,
      },
      (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            res.json({
              data: result.rows,
            });
          }
        }
      }
    );
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const getAllProductByShop = async (req: Request, res: Response) => {
  try {
    const { code_shop, page, q, code_type } = req.query;
    const dataCountProductShop = await InfoShopModel.getCountAllProductShopModel({
      code_shop: (code_shop as string) || '',
      q: (q as string) || '',
      code_type: code_type as string,
    });
    const dataCategoryProductShop = await InfoShopModel.getAllCategoryProductShopModel2({ code_shop: (code_shop as string) || '' });
    await InfoShopModel.getAllProductShopModel(
      {
        code_shop: (code_shop as string) || '',
        page: Number(page) || 1,
        q: (q as string) || '',
        code_type: code_type as string,
      },
      (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            const dataPaging = {
              count: Number(dataCountProductShop.rows[0].count) || 0,
              rows: result.rows,
            };
            const { tutorials, totalItems, totalPages, currentPage } = getPagingData(dataPaging, Number(page) || 1, 20);
            res.json({
              category: dataCategoryProductShop.rows[0],
              totalPages,
              totalItems,
              limit: 20,
              currentPage,
              data: tutorials,
            });
          }
        }
      }
    );
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const followShopByUser = async (req: Request, res: Response) => {
  try {
    const { code_shop } = req.body;
    const data_user = await dataUserTK(req);
    if (data_user) {
      await InfoShopModel.followShopByUserModel({ code_shop: (code_shop as string) || '', code_user: data_user?.payload.code_user || '' }, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            if (result.rowCount > 0) {
              res.json({
                message: 'Theo dõi thành công',
              });
            } else {
              res.json({
                message: 'Theo dỗi không thành công',
              });
            }
          }
        }
      });
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const disableFollowShopByUser = async (req: Request, res: Response) => {
  try {
    const { code_shop } = req.query;
    const data_user = dataUserTK(req);
    if (data_user) {
      const dataSQL = {
        code_user: data_user?.payload.code_user?.trim(),
        code_shop: (code_shop as string) || '',
      };
      await InfoShopModel.disableFollowShopByUserModel(dataSQL, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            res.json({
              message: 'Success',
            });
          }
        }
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const getAllCategoryShop = async (req: Request, res: Response) => {
  try {
    const code_shop = (req.query.code_shop as string) || '';
    await InfoShopModel.getAllCategoryShopModel({ code_shop: code_shop }, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          res.json({
            data: result.rows,
          });
        }
      }
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
