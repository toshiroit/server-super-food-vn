class SqlRoot {
  public static SQL_GET_USER_PHONE = () => {
    return `select * from users where phone=($1)`;
  };
  public static SQL_GET_USER_USER_NAME = () => {
    return `select * from users where user_name=($1)`;
  };
  public static SQL_GET_USER = () => {
    return `select * from users where phone=($1) OR user_name=($2)`;
  };
  public static SQL_LOGIN_USER_FULL = () => {
    return `select * from users where phone=($1) AND user_name=($2)`;
  };
  public static SQL_LOGIN_USER = (table: string | null) => {
    return `select * from users where phone=($1) OR user_name=($2)`;
  };

  /**
   *
   * @param table table database select
   * @returns  return sql select table where value
   */
  public static SQL_GET_ONE = (table: string | null, field: string | null) => {
    return `select * from ${table} where ${field}=($1)`;
  };
  /**
   *
   * @param table table database insert
   * @returns return sql insert table : value
   */
  public static SQL_INSERT_DATA = (table: string | null) => {
    return `insert into ${table} SET ?`;
  };

  public static SQL_INSERT_DATA_PS = (table: string | null, fields?: string, values?: string) => {
    return `insert into ${table} (${fields}) VALUES (${values})`;
  };

  /**
   *
   * @param table table database
   * @param condition where update
   * @returns return sql update table set value
   */
  public static SQL_UPDATE_DATA = (table: string | null, condition: string | undefined | null) => {
    return `UPDATE ${table} SET ? WHERE ${condition} =($1)`;
  };

  public static SQL_UPDATE_REFRESH_TOKEN_USER = () => {
    return `UPDATE users SET refresh_token=($1) WHERE phone=($2)`;
  };
  /**
   *
   * @param table table database
   * @param condition where condition delete
   */
  public static SQL_DELETE_DATA = (table: string | null, condition: string | undefined | null) => {
    return `DELETE FROM ${table} WHERE ${condition}=?`;
  };
  /**
   *
   * @param table table database
   * @param field field column table
   * @returns
   */
  public static SQL_GET_ALL = (table: string | null, field: string | null | undefined) => {
    return `SELECT * FROM ${table} ORDER BY ${field} DESC`;
  };
  public static SQL_GET_ALL_NO_FIELD = (table: string | null, field: string | null | undefined) => {
    return `SELECT * FROM ${table}`;
  };
  public static SQL_GET_ALL_BY_FIELD = (table: string | null) => {
    return `SELECT * FROM ${table} WHERE ??=? ORDER_BY ?? DESC`;
  };

  public static SQL_GET_PAGINATE_LIST = (table: string | null) => {
    return `SELECT * FROM ${table} where ??=? ORDER_BY ?? DESC LIMIT ? OFFSET ?`;
  };

  /**
   *
   * @param table table database
   * @returns return pagination table
   */
  public static SQL_GET_PAGINATE_LIST_2 = (table: string | null) => {
    return `SELECT * FROM ${table} where ??=? AND ORDER_BY ?? DESC LIMIT ? OFFSET ?`;
  };

  public static SQL_GET_ONE_USER_VERIFY_MAILER_CODE = () => {
    return `SELECT * FROM users where id=($1) AND verification_code=($2)`;
  };
}
export default SqlRoot;
