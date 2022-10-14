class SqlRoot {
  public static SQL_GET_USER_PHONE = () => {
    return `SELECT * FROM user_sp,user_detail_sp where user_sp.code_user_detail=user_detail_sp.code_user_detail and user_sp.phone=($1)`;
  };
  public static SQL_GET_USER_USER_NAME = () => {
    return `select * from users where user_name=($1)`;
  };
  public static SQL_GET_USER = () => {
    return `select * from users where phone=($1) OR user_name=($2)`;
  };
  public static SQL_LOGIN_USER_FULL = () => {
    return `SELECT * FROM user_sp,user_detail_sp where user_sp.code_user_detail=user_detail_sp.code_user_detail and user_sp.phone=($1)`;
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

  public static SQL_REGISTER_USER_PS = () => {
    return `insert into user_sp (code_user,password,code_role,phone,"createdAt",status) VALUES ($1,$2,$3,$4,$5,$6)`;
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


  public static SQL_GET_PRODUCT_BY_NAME_OR_CODE = () => {
    return `select * from product_sp p join product_detail_sp pd on 
            p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
            on pg.code_product_guide=pd.code_product_guide where p.code_product=($1) OR name like ($2)`
  }
  public static SQL_GET_PRODUCT_ALL = () => {
    return `select * from product_sp p join product_detail_sp pd on 
            p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
            on pg.code_product_guide=pd.code_product_guide`
  }

  public static SQL_GET_COMMENT_ALL_BY_PRODUCT = () => {
    return `
        select cm.*,mess.*,u.avatar,u.code_user,ud.full_name from comment_sp cm 
          join message_sp mess on mess.code_message = cm.code_message 
          join product_sp p on p.code_product = cm.code_product 
          join user_sp u on u.code_user = cm.code_user
          join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
          where p.code_product=($1)
      `
  }

  public static SQL_GET_USER_TEST = () => {
    return `select * from user_sp`
  }

}
export default SqlRoot;
