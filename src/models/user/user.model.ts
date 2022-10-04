import { modelQuery, CallbackHandler } from './../../interfaces/model_query/modelQuery';
import pool from '../../database';
import { User } from '../../types/user.type';
import Model from '../Model';
import SqlRoot from '../sql';
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
}
export default UserModel;
