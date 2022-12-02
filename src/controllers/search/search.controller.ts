import { Request, Response } from 'express';
import config from '../../config/config';
import { getPagingData } from '../../libs/getPagination';
import { ProductModel } from '../../models/product/product.model';
import { SearchModel } from '../../models/search/search.model';
import { SearchProductByQuery } from '../../types/search/search';

export const listTextSearchProduct = async (req: Request, res: Response) => {
  try {
    const { text } = req.query;
    const data = await SearchModel.getListTextSearchProduct({ text: (text as string) || '' });
    if (data.rows.length > 0) {
      res.json({
        text: text,
        data: data.rows,
      });
    } else {
      res.json({
        message: 'Không có dữ liệu',
        data: data.rows,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const searchProductByType = async (req: Request<null, null, null, SearchProductByQuery>, res: Response) => {
  try {
    const dataQuery = {
      q: req.query.q.toLowerCase(),
      typeShow: req.query.typeShow,
      listShop: req.query.listShop,
      sort: req.query.sort,
      page: req.query.page,
      size: req.query.size,
    };

    const dataCount = await ProductModel.getCountProduct(dataQuery);
    await ProductModel.getProductByQueryModel(dataQuery, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          const dataPaging = {
            count: Number(dataCount.rows[0].count) || 0,
            rows: result.rows,
          };
          const { tutorials, totalItems, totalPages, currentPage } = getPagingData(
            dataPaging,
            Number(dataQuery.page) || 1,
            Number(config.search_product_limit_show) || 30
          );
          res.json({
            totalItems,
            totalPages,
            currentPage,
            limit: Number(config.search_product_limit_show),
            data: tutorials,
          });
        }
      }
    });
  } catch (error) {
    res.json({
      error: 'Error ',
    });
  }
};
