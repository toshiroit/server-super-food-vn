import { ChatDataSQL } from '.././../../types/chat/chat';
import { timeVietNameYesterday } from '.././../../libs/timeVietNam';
import { makeId } from '.././../../libs/make_id';
import { ChatModel } from '.././../../models/chat/chat.model';
import { Request, Response } from 'express';
import { getDataUser } from '../../../libs/getUserToken';
import { ChatModelShop } from '../../../models/shop/chat/chat.model';
const dataUserTK = (req: Request) => {
  const { cookie } = req.headers;
  const bearer = cookie?.split('=')[0].toLowerCase();
  const token = cookie?.split('=')[1];
  const data_user = getDataUser(token, bearer);
  return data_user;
};
export const sendMessengerChatShop = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const data_user = dataUserTK(req);
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
    const data_user = dataUserTK(req);
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
