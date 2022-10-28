class SqlRoot {
  public static SQL_GET_USER_PHONE = () => {
    return `
          SELECT u.*,ud.* FROM user_sp u 
          left 
          join user_detail_sp ud 
          on u.code_user_detail=ud.code_user_detail 
          where u.phone =($1)

    `;
  };
  public static SQL_GET_USER_USER_NAME = () => {
    return `select * from users where user_name=($1)`;
  };
  public static SQL_GET_USER = () => {
    return `select * from users where phone=($1) OR user_name=($2)`;
  };
  public static SQL_LOGIN_USER_FULL = () => {
    return `
          SELECT u.*,ud.* FROM user_sp u 
          left 
          join user_detail_sp ud 
          on u.code_user_detail=ud.code_user_detail 
          where u.phone =($1)
    `;
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

  public static SQL_REGISTER_USER_PS_3 = () => {
    return `insert into user_sp 
            (code_user,password,code_role,phone,"createdAt",status) VALUES ($1,$2,$3,$4,$5,$6)
    `;
  };

  public static SQL_REGISTER_USER_PS = () => {
    return `
        with ins as (
	        INSERT INTO user_sp 
        	  (code_user,code_user_detail,password,code_role,phone,"createdAt",status) 
	        VALUES 
	          ($1,$2,$3,$4,$5,$6,$7)
	        RETURNING code_user_detail
        )
          INSERT INTO user_detail_sp 
          (code_user_detail, full_name, sex, code_restpass,"createdAT")
            VALUES
          ((select code_user_detail from ins),$8,$9,$10,$11)
    `
  }
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
  public static SQL_GET_CART_BY_CODE_USER = () => {
    return ` select c.*,p.*,pd.discount,v.code_w_voucher,v.price_voucher,
                v.name_voucher,v.quality as quality_voucher,v.time_start,v.time_end,v.description
                from cart_sp c 
	              join user_sp u on u.code_user = c.code_user 
		            join product_sp p on p.code_product = c.code_product 
                join product_detail_sp pd on pd.code_product_detail = p.code_product_detail
                left join voucher_sp v on v.code_product = p.code_product
		            where u.code_user=($1)`
  }

  /*public static SQL_ADD_CART_BY_CODE_USER = () => {
    return `INSERT INTO cart_sp (code_cart,code_user,code_product,quality_product,createdat)
            VALUES ($1,$2,$3,$4,$5)`
  }*/

  public static SQL_ADD_CART_BY_CODE_USER = () => {
    return `
      INSERT INTO cart_sp (code_cart,code_user,code_product,quality_product,createdat)
      VALUES %L on conflict (code_cart)
      DO UPDATE SET quality_product=EXCLUDED.quality_product,createdat=EXCLUDED.createdat
    `
  }

  public static SQL_UPDATE_CART_BY_CODE_USER = () => {
    return `
      UPDATE cart_sp 
      SET 
      quality_product=($4),createdat=($5),code_product=($3) 
      where code_cart=($1) and code_user=($2)
    `
  }
  public static SQL_REMOVE_CART_BY_CODE_CART_AND_USER = () => {
    return `
      DELETE FROM cart_sp c
	    WHERE c.code_cart=($1) AND c.code_user=($2)
    `
  }

  public static SQL_GET_PRODUCT_BY_QUERY = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
    `
  }

  public static SQL_GET_COUNT_PRODUCT = () => {
    return `
      select count(*) from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
    `
  }


  public static SQL_UPDATE_USER_W1 = () => {
    return `
        UPDATE user_detail_sp SET full_name=($1),sex=($2),date_birth=($3) where code_user_detail=($4)
    `
  }

  public static SQL_GET_ORDER_BY_USER = () => {
    return `
      SELECT o.*,od.*,
      u.code_user,
      u.avatar,
      u.phone,
      s.*
      FROM order_sp o 
      join user_sp u on u.code_user = o.code_user 
      left join user_detail_sp ud  on ud.code_user_detail = u.code_user_detail  
      join order_detail_sp od on od.code_order_detail = o.code_order_detail 
      left join shop_sp s on s.code_shop = od.code_shop
      where u.code_user = ($1)
    `
  }
  public static SQL_GET_COUNT_ORDER_BY_USER = () => {
    return `
      SELECT 
      count(*)
      FROM order_sp o 
      join user_sp u on u.code_user = o.code_user 
      left join user_detail_sp ud  on ud.code_user_detail = u.code_user_detail  
      join order_detail_sp od on od.code_order_detail = o.code_order_detail 
      where u.code_user = ($1)
    `
  }

  public static SQL_GET_ADDRESS_BY_USER = () => {
    return `
    select ar.*,ard.* from address_sp ar 
    join address_detail_sp ard on ar.code_address_detail = ard.code_address_detail 
    join user_sp u on u.code_user = ar.code_user 
    where u.code_user=($1)
    `
  }

  public static SQL_GET_ORDER_DETAIL_BY_USER = () => {
    return `
      SELECT o.*,od.*,
      u.code_user,
      u.avatar,
      u.phone,
      s.*,
      p.*
      FROM order_sp o 
      join user_sp u on u.code_user = o.code_user 
      left join user_detail_sp ud  on ud.code_user_detail = u.code_user_detail  
      join order_detail_sp od on od.code_order_detail = o.code_order_detail 
      left join shop_sp s on s.code_shop = od.code_shop
      join product_sp p on p.code_product = ANY (o.code_product)
      where u.code_user = ($1) and o.code_order = ($2)
    `
  }
  public static SQL_GET_USER_ADMIN = () => {
    return `
          SELECT u.*,ud.* FROM user_sp u 
          left 
          join user_detail_sp ud 
          on u.code_user_detail=ud.code_user_detail 
          join role_sp r on r.code_role = u.code_role
          where u.user_name = ($1) AND r.code_role='ROLE-WIAO-ADMIN'

    `;
  }
  public static SQL_GET_PRODUCT_BY_SHOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      left join shop_sp s on s.code_shop = p.code_shop 
      where p.code_shop=($1) ORDER BY p.evaluate 
    `
  }

  public static SQL_GET_PRODUCT_BY_TOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      ORDER BY p.evaluate 
    `
  }

  public static SQL_GET_PRODUCT_BY_PAY_TOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      ORDER BY pd.purchase
    `
  }

}
export default SqlRoot;
