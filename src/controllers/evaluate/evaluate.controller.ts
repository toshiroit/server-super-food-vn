import { Request, Response } from 'express';
import { dataUserTK } from '../../libs/data_user';
import { getPagingData } from '../../libs/getPagination';
import { getDataUser } from '../../libs/getUserToken';
import { makeId } from '../../libs/make_id';
import { timeVietNameYesterday } from '../../libs/timeVietNam';
import { EvaluateModel } from '../../models/evaluate/evaluate.model';
import { EvaluateCheck, EvaluateData } from '../../types/evaluate/evaluate';

export const checkEvaluateByProductUserOrder = async (req: Request, res: Response) => {
  try {
    const { code_order, code_product } = req.query;
    const data_user = await dataUserTK(req);
    const dataSQL: EvaluateCheck = {
      code_order: (code_order as string) || '',
      code_product: (code_product as string) || '',
      code_user: data_user?.payload.code_user || '',
    };
    const is_check = await EvaluateModel.checkEvaluateByProductUserOrderModel(dataSQL);
    if (is_check.rows[0]?.count === 0) {
      res.status(200).json({
        is_evaluate: false,
      });
    } else {
      res.status(200).json({
        code_product: code_product,
        is_evaluate: true,
      });
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const getEvaluateByProduct = async (req: Request, res: Response) => {
  try {
    const { code_product, limit, page } = req.query;
    const data_count = await EvaluateModel.getCountEvaluateByProduct({ code_product: (code_product as string) || '' });
    const evaluate_5 = await EvaluateModel.getCountEvaluate5Model({ code_product: (code_product as string) || '' });
    const evaluate_4 = await EvaluateModel.getCountEvaluate4Model({ code_product: (code_product as string) || '' });
    const evaluate_3 = await EvaluateModel.getCountEvaluate3Model({ code_product: (code_product as string) || '' });
    const evaluate_2 = await EvaluateModel.getCountEvaluate2Model({ code_product: (code_product as string) || '' });
    const evaluate_1 = await EvaluateModel.getCountEvaluate1Model({ code_product: (code_product as string) || '' });
    const evaluate_all = await EvaluateModel.getCountAllEvaluateModel({ code_product: (code_product as string) || '' });
    await EvaluateModel.getEvaluateByProduct({ code_product: (code_product as string) || '', limit: Number(limit) || 5 }, (err, result) => {
      if (err) {
        res.json({
          err,
        });
      } else {
        if (result) {
          const dataPaging = {
            count: data_count.rows[0].count || 0,
            rows: result.rows,
          };
          const { tutorials, totalItems, totalPages, currentPage } = getPagingData(dataPaging, Number(page) || 1, 5);
          res.json({
            totalItems,
            totalPages,
            currentPage,
            evaluate: {
              evaluate_all: evaluate_all.rows.length > 0 ? evaluate_all.rows[0].count : 0,
              evaluate_1: evaluate_1.rows.length > 0 ? evaluate_1.rows[0].count : 0,
              evaluate_2: evaluate_2.rows.length > 0 ? evaluate_2.rows[0].count : 0,
              evaluate_3: evaluate_3.rows.length > 0 ? evaluate_3.rows[0].count : 0,
              evaluate_4: evaluate_4.rows.length > 0 ? evaluate_4.rows[0].count : 0,
              evaluate_5: evaluate_5.rows.length > 0 ? evaluate_5.rows[0].count : 0,
            },
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

export const addEvaluateByProduct = async (req: Request, res: Response) => {
  try {
    const { code_product, evaluate_product, evaluate_ship, evaluate_progress, text, images, code_order } = req.body;
    const data_user = dataUserTK(req);
    const dataSQL: EvaluateData = {
      code_evaluate: makeId(15),
      code_user: data_user?.payload.code_user || '',
      code_product: code_product,
      evaluate_product,
      evaluate_ship,
      evaluate_progress,
      images: JSON.stringify(images),
      text,
      createdAt: timeVietNameYesterday(),
      code_order,
    };
    await EvaluateModel.addEvaluateByProductModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              message: 'Đánh giá thành công ',
            });
          } else {
            res.status(400).json({
              message: 'Bạn đã đánh giá sản phẩm này rồi : ERROR F400',
            });
          }
        }
      }
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
