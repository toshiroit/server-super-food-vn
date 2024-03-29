import { modelQuery, CallbackHandler } from './../../interfaces/model_query/modelQuery';
import pool from '../../database';
import { User } from '../../types/user.type';
import Model from '../Model';
import SqlRoot from '../sql';
import { UserUpdateData, UserUpdateW1Info, UserUpdateW1InfoIO } from '../../types/user/user';
class UserModel extends Model {
  private model = new Model();

  protected async createUser(u: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (email,user_name,first_name,last_name,password)
      values ($1,$2,$3,$4,$5) returning *`;
      const result = await pool.query(sql, [u.email, u.user_name, u.first_name, u.last_name, u.password]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to create (${u.user_name}): ${(error as Error).message}`);
    }
  }

  public static async updateUserW1(data: UserUpdateData, callback: CallbackHandler) {
    //const resultData = [data.fullName, data.sex, data.date, code_user_detail_ds];
    const dataSQL = [data.avatar, data.code_user, data.full_name, data.sex, data.date];
    pool.query(SqlRoot.SQL_UPDATE_USER_W1(), dataSQL, callback);
  }
}
export default UserModel;
