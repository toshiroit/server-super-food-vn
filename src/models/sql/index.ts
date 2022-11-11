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
    return ` select c.*,p.*,s.*,pd.discount,v.code_w_voucher,v.price_voucher,
                v.name_voucher,v.quality as quality_voucher,v.time_start,v.time_end,v.description
                from cart_sp c 
	              join user_sp u on u.code_user = c.code_user 
		            join product_sp p on p.code_product = c.code_product 
                join product_detail_sp pd on pd.code_product_detail = p.code_product_detail
                left join voucher_sp v on v.code_product = p.code_product
                left join shop_sp s on s.code_shop = p.code_shop
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
    //join product_sp p on p.code_product = ANY (o.code_product)

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
          where u.user_name = ($1) AND r.code_role='ROLE-WIXX-SHOP'

    `;
  }

  public static SQL_GET_ME_SHOP = () => {
    return `
    SELECT s.*,sd.* FROM user_sp u
    left
    join user_detail_sp ud on u.code_user_detail=ud.code_user_detail
    join role_sp r on r.code_role = u.code_role
    join shop_sp s on s.code_shop= u.code_shop
    join shop_detail_sp sd on sd.code_shop_detail = s.code_shop_detail
    where u.code_user = ($1) AND r.code_role='ROLE-WIXX-SHOP'
    `
  }
  public static SQL_GET_PRODUCT_BY_SHOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      left join shop_sp s on s.code_shop = p.code_shop 
      where p.code_shop=($1) 
    `
  }
  public static SQL_GET_COUNT_PRODUCT_BY_SHOP = () => {
    return `
      select count(*) from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      left join shop_sp s on s.code_shop = p.code_shop 
      where p.code_shop=($1) 
    `
  }


  public static SQL_GET_PRODUCT_BY_TOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      ORDER BY p.evaluate DESC
    `
  }

  public static SQL_GET_PRODUCT_BY_PAY_TOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      ORDER BY pd.purchase DESC
    `
  }

  public static SQL_GET_PRODUCT_BY_NEW_SHOP = () => {
    return `
      select * from product_sp p 
      join product_detail_sp pd on p.code_product_detail=pd.code_product_detail 
      join product_guide_sp pg on pg.code_product_guide=pd.code_product_guide
      join shop_sp s on s.code_shop = p.code_shop
      join shop_detail_sp sd on sd.code_shop_detail = s.code_shop_detail
      where pd.is_show=1
      ORDER BY sd.createdat DESC
    `
  }

  public static SQL_GET_CATEGORY_PRODUCT_BY_SHOP = () => {
    return `
      select c.*
        from product_detail_sp pd  
        join product_sp p on p.code_product_detail = pd.code_product_detail
        cross join jsonb_to_recordset(pd.category_code) as al(code varchar)
        inner join category_sp c on c.category_code=al.code
        where p.code_shop=($1)
    `
  }

  public static SQL_ADD_PRODUCT_BY_SHOP = () => {
    return `
      with insp as (
	      INSERT INTO product_sp(
	      code_product, code_shop, image, name, price, quality, evaluate, code_product_detail,code_product_type)
	      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  	    RETURNING code_product_detail
      ),
       inspd as (
	      INSERT INTO product_detail_sp(
	      code_product_detail, purchase, discount, code_product_guide, "createdAt", type_product, category_code,"date_start","date_end",is_show,images,free_ship)
	      VALUES 
	      ((select code_product_detail from insp ),$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
	      RETURNING code_product_guide
      )
	      INSERT INTO product_guide_sp(
	      code_product_guide, description, guide, "return", note)
	      VALUES ((select code_product_guide from inspd ), $21, $22, $23, $24)
    `
  }
  public static SQL_GET_ALL_CATEGORY_BY_SHOP = () => {
    return 'select * from category_sp c where c.code_shop=($1)'
  }

  public static SQL_GET_PRODUCT_BY_CODE_AND_SHOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      WHERE p.code_shop=($1) and p.code_product=($2)
    `
  }

  public static SQL_GET_ALL_PRODUCT_BY_ORDER_AND_SHOP = () => {
    return `
      select p.* from order_sp o 
      join order_detail_sp od on od.code_order_detail = o.code_order_detail
      cross join jsonb_to_recordset(o.code_product) as al(code varchar)
      inner join product_sp p on p.code_product = al.code
      where od.code_shop = ($1)
    `
  }

  public static SQL_GET_ALL_ORDER_BY_SHOP = () => {
    return `
      select * from order_sp o 
      join order_detail_sp od on od.code_order_detail = o.code_order_detail
      where od.code_shop=($1)
    `
  }

  public static SQL_HIDE_ORDER_BY_SHOP = () => {
    return `
        UPDATE order_sp SET is_show=($1)
        where code_shop=($2) and code_order=($3)
      `
  }

  public static SQL_REMOVE_ORDER_SHOP = () => {
    return `

      `
  }

  public static SQL_GET_ALL_PRODUCT_TYPE = () => {
    return `
      select * from product_type_sp pt where pt.code_shop=($1)
    `
  }

  public static SQL_ADD_TYPE_PRODUCT = () => {
    return `
      INSERT INTO product_type_sp
      (code_product_type, name_product_type, status, code_shop)
      VALUES 
      ($1,$2,$3,$4)
    `
  }


  public static SQL_REMOVE_PRODUCT_BY_SHOP = () => {
    return `
      with rmProduct_sp as (
	      DELETE FROM product_sp where code_product=($1) and code_shop=($2)
	      returning code_product_detail,code_product
      ),
      rmProductDetail_sp as (
	      DELETE FROM product_detail_sp where code_product_detail in (select code_product_detail from rmProduct_sp)
        returning code_product_guide
      ),
      rmProductGuide_sp as (
	      DELETE FROM product_guide_sp where code_product_guide in (select code_product_guide from rmProductDetail_sp)
      ),
      rmVoucher_sp as (
	      DELETE FROM voucher_sp where code_product in (select code_product from rmProduct_sp)
	      RETURNING code_type_voucher
      ),
      rmVoucherType as (
	      DELETE FROM voucher_type_sp where code_type_voucher in (select code_type_voucher from rmVoucher_sp)
      )
        DELETE FROM cart_sp where cart_sp.code_product in (select code_product from rmProduct_sp)
    `
  }

}
export default SqlRoot;
