import { ChatDataSQL } from '.././../../types/chat/chat';
import { timeVietNameYesterday } from '.././../../libs/timeVietNam';
import { makeId } from '.././../../libs/make_id';
import { ChatModel } from '.././../../models/chat/chat.model';
import { Request, Response } from 'express';
import { getDataUser } from '../../../libs/getUserToken';
import { ChatModelShop } from '../../../models/shop/chat/chat.model';
import { dataUserTK } from '../../../libs/data_user';

export const sendMessengerChatShop = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const data_user = await dataUserTK(req);
    const dataSQL: ChatDataSQL = {
      code_chat: makeId(100),
      code_user: data.code_user,
      type_chat: '2',
      text_chat: data.text_chat,
      time_chat: timeVietNameYesterday(),
      room_chat: makeId(100),
      code_shop: data_user?.payload.code_shop,
    };
    await ChatModelShop.sendMessengerChat(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              dataSQL: dataSQL,
              messenger: 'Thành công',
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

export const getAllMessengerChatByCode = async (req: Request, res: Response) => {
  try {
    const data_user = await dataUserTK(req);
    const code_shop = data_user?.payload.code_shop;
    const { code_user } = req.query;
    await ChatModelShop.getAllMessengerChatByCodeUser({ code_user: (code_user as string) || '', code_shop: code_shop, limit: 20 }, (err, result) => {
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

export const getAllUserMessengerChatByShop = async (req: Request, res: Response) => {
  try {
    const data_shop = await dataUserTK(req);
    const code_shop = data_shop?.payload.code_shop;
    await ChatModelShop.getAllUserMessengerByShopModel({ code_shop: code_shop }, (err, result) => {
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
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
