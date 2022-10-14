import pool from "../../database";
import { CallbackHandler } from "../../interfaces/model_query/modelQuery";
import Model from "../Model";
import SqlRoot from "../sql";
export class CommentModel extends Model {
  public static async getAllCommentByProductModel(code_product: string, callback: CallbackHandler) {
    pool.query(SqlRoot.SQL_GET_COMMENT_ALL_BY_PRODUCT(), [code_product], callback);
  }
}
