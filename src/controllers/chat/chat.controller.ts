import { ChatDataSQL } from './../../types/chat/chat';
import { timeVietNameYesterday } from './../../libs/timeVietNam';
import { makeId } from './../../libs/make_id';
import { ChatModel } from './../../models/chat/chat.model';
import { Request, Response } from 'express';
import { getDataUser } from '../../libs/getUserToken';
import { dataUserTK } from '../../libs/data_user';

export const sendMessengerChat = async (req: Request, res: Response) => {
  try {
    const { text_chat, type_chat, code_shop } = req.body;
    const data_user = await dataUserTK(req);
    const dataSQL: ChatDataSQL = {
      code_chat: makeId(100),
      code_user: data_user?.payload.code_user,
      type_chat: '1',
      text_chat,
      time_chat: timeVietNameYesterday(),
      room_chat: makeId(100),
      code_shop,
    };

    await ChatModel.sendMessengerChat(dataSQL, (err, result) => {
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
    const { code_shop } = req.query;
    const code_user = data_user?.payload.code_user;
    await ChatModel.getAllMessengerChatByCodeUser({ code_user: code_user, code_shop: (code_shop as string) || '', limit: 20 }, (err, result) => {
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
