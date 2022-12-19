import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { getDataUser } from '../../../libs/getUserToken';
import { makeId } from '../../../libs/make_id';
import { CategoryModel } from '../../../models/shop/category/category.model';
import { CategoryData, CategoryRemove, GetCategoryProductByShop } from '../../../types/shop/category/category';

export const removeCategoryByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL: CategoryRemove = {
      category_code: (req.query.category_code as string) || '',
      code_shop: data_user?.payload.code_shop,
    };
    await CategoryModel.removeCategoryShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.status(200).json({
              message: 'Xoá thành công ',
            });
          } else {
            res.status(400).json({
              message: 'Lỗi ',
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

export const updateCategoryByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const data_SQL: CategoryData = {
      code_shop: data_user?.payload.code_shop,
      name_category: req.body.category_name,
      info_category: req.body.category_info,
      status_category: Number(req.body.category_status) === 1 ? true : false,
      image: req.body.category_image,
      category_code: (req.body.category_code as string) || '',
    };
    await CategoryModel.updateCategoryByShopModel(data_SQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              message: 'Cập nhật thành công ',
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
      error: error,
    });
  }
};

export const addNewCategoryByShop = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const dataSQL: CategoryData = {
      category_code: makeId(15),
      code_shop: data_user?.payload.code_shop,
      name_category: req.body.category_name,
      info_category: req.body.category_info,
      status_category: Number(req.body.category_status || -1) === -1 ? false : true,
      image: req.body.category_image,
    };
    const check_name_category = await CategoryModel.checkNameCategoryShopModel(dataSQL);
    if (check_name_category.rows[0] && check_name_category.rows[0].count === '0') {
      await CategoryModel.addNewCategoryByShopModel(dataSQL, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            if (result.rowCount > 0) {
              res.json({
                message: 'Thêm thành công',
              });
            } else {
              res.status(400).json({
                message: 'Thêm không thành công',
              });
            }
          }
        }
      });
    } else {
      res.status(400).json({
        message: 'Tên danh mục đã tồn tại',
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const getCategoryProductShop = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const data_user = await dataUserTK(req);

    const dataSQL: GetCategoryProductByShop = {
      code_shop: (data_user?.payload.code_shop as string) || '',
      page: page as string,
      limit: '',
    };
    await CategoryModel.getCategoryProductShopModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          const dataPaging = {
            count: 0,
            rows: result.rows,
          };
          res.json({
            data: result.rows,
          });
        }
      }
    });
  } catch (err) {
    res.json({
      error: 'Error',
    });
  }
};
export const getAllCategoryByShop = async (req: Request, res: Response) => {
  try {
    const { cookie } = req.headers;
    const data_user = await dataUserTK(req);
    const code_shop = (data_user?.payload.code_shop as string) || '';
    await CategoryModel.getAllCategoryByShopModel({ code_shop: code_shop }, (err, result) => {
      if (err)
        res.json({
          error: err,
        });
      else if (result)
        res.json({
          data: result.rows,
        });
    });
  } catch (err) {
    res.json({
      error: 'ERROR',
    });
  }
};
