import { Request, Response } from 'express';
import { dataUserTK } from '../../../libs/data_user';
import { StatisticalModel } from '../../../models/shop/statistical/statistical.model';
import { StatisticalPrice } from '../../../types/statistical/statistical';

export const getStatisticalFull = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;
    const data_user = await dataUserTK(req);
    const dataSQL = {
      code_shop: data_user?.payload.code_shop,
      year: (year as string) || '',
    };
    await StatisticalModel.getStatisticalFullModel(dataSQL, (err, result) => {
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
      error,
    });
  }
};

export const getStatisticalValue = async (req: Request, res: Response) => {
  try {
    const yourDate = new Date();
    const { date_max, date_min, date_today } = req.query;
    let date_max_w: any = date_max;
    let date_min_w: any = date_min;
    if (!date_max) {
      date_max_w = yourDate;
    }
    if (!date_min) {
      date_min_w = yourDate;
    }
    const dateTodayToYesterDay = new Date();
    dateTodayToYesterDay.setDate(new Date(date_max_w).getDate() - 1);
    const dateTodayToLastMonth = new Date(date_max_w);
    dateTodayToLastMonth.setMonth(new Date(date_max_w).getMonth());
    const dateTodayToLastMonth2 = new Date(date_max_w);
    dateTodayToLastMonth2.setMonth(new Date(date_max_w).getMonth() - 1);

    // ? 222
    const dateTodayToYesterDay_1 = new Date(date_max_w);
    dateTodayToYesterDay.setDate(new Date(date_max_w).getDate() - 1);
    const dateTodayToLastMonth_1 = new Date(date_max_w);
    dateTodayToLastMonth_1.setMonth(new Date(date_max_w).getMonth() - 1);
    const dateTodayToLastMonth_2 = new Date(date_max_w);
    dateTodayToLastMonth_2.setMonth(new Date(date_max_w).getMonth() - 2);
    const data_user = await dataUserTK(req);
    const dataSQL: StatisticalPrice = {
      code_shop: data_user?.payload.code_shop,
      date_today: date_today as string,
      date_yesterday: dateTodayToYesterDay.toISOString().split('T')[0],
      date_lastMonth: dateTodayToLastMonth.toISOString().split('T')[0],
      date_lastMonth2: dateTodayToLastMonth2.toISOString().split('T')[0],
      date_lastMonth_1: dateTodayToLastMonth_1.toISOString().split('T')[0],
      date_lastMonth_2: dateTodayToLastMonth_2.toISOString().split('T')[0],
      date_yesterday_1: dateTodayToYesterDay_1.toISOString().split('T')[0],
    };

    await StatisticalModel.getStatisticalValueModel(dataSQL, (err, result) => {
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
      error,
    });
  }
};
