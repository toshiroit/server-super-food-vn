import pool from '../../database';
import { CallbackHandler } from '../../interfaces/model_query/modelQuery';
import { ChatDataSQL } from '../../types/chat/chat';
import Model from '../Model';
import SqlRoot from '../sql';

export class ChatModel extends Model {
  public static async sendMessengerChat(data: ChatDataSQL, callback: CallbackHandler) {
    const dataSQL = [data.code_chat, data.code_user, data.type_chat, data.text_chat, data.time_chat, data.room_chat, data.code_shop];
    pool.query(SqlRoot.SQL_SEND_MESSENGER_CHAT(), dataSQL, callback);
  }

  public static async getAllMessengerChatByCodeUser(data: { code_user: string; code_shop: string; limit: number }, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_ALL_MESSENGER_CHAT_BY_CODE_USER(), [data.code_user, data.code_shop, data.limit], callback);
  }
}
