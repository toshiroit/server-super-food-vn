import { Request, Response } from 'express';
import { getPagingData } from '../../../libs/getPagination';
import { SearchModel } from '../../../models/shop/search/search.model';

export const getShopByNameAndCode = async (req: Request, res: Response) => {
  try {
    const dataSQL = {
      page: Number(req.query.page) || 1,
      code_shop: (req.query.code_shop as string) || '',
      name_shop: (req.query.name_shop as string) || '',
    };

    const data_countShop = await SearchModel.getCountShopModelByNameAndCode(dataSQL);
    console.log(data_countShop.rows[0]);
    await SearchModel.getShopModelByNameAndCode(dataSQL, (err, result) => {
      if (err) {
        res.json({
          err,
        });
      } else {
        if (result) {
          const dataPaging = {
            count: Number(data_countShop.rows[0].count) || 0,
            rows: result.rows,
          };
          const { currentPage, totalItems, totalPages, tutorials } = getPagingData(dataPaging, dataSQL.page, 10);
          res.json({
            totalPages,
            totalItems,
            limit: 10,
            currentPage,
            data: tutorials,
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
