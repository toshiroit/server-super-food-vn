"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqlRoot {
}
SqlRoot.SQL_GET_USER_PHONE = () => {
    return `
          SELECT u.*,ud.* FROM user_sp u 
          left 
          join user_detail_sp ud 
          on u.code_user_detail=ud.code_user_detail 
          where u.phone =($1)

    `;
};
SqlRoot.SQL_GET_USER_USER_NAME = () => {
    return `select * from users where user_name=($1)`;
};
SqlRoot.SQL_GET_USER = () => {
    return `select * from users where phone=($1) OR user_name=($2)`;
};
SqlRoot.SQL_LOGIN_USER_FULL = () => {
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
SqlRoot.SQL_GET_ONE = (table, field) => {
    return `select * from ${table} where ${field}=($1)`;
};
SqlRoot.SQL_SEND_CODE = () => {
    return `
      INSERT INTO 
        otp
         (code_otp, otp_text,status,"createdAt", "endTime")
	      VALUES 
        ($1,$2,$3,$4,$5)
    `;
};
SqlRoot.SQL_CHECK_CODE = () => {
    return `
      SELECT code_otp,otp_text from otp where status=true and "endTime" > ($1)
    `;
};
SqlRoot.SQL_DISABLE_CODE = () => {
    return `
      UPDATE otp SET status=false where code_otp=($1)
    `;
};
/**
 *
 * @param table table database insert
 * @returns return sql insert table : value
 */
SqlRoot.SQL_INSERT_DATA = (table) => {
    return `insert into ${table} SET ?`;
};
SqlRoot.SQL_INSERT_DATA_PS = (table, fields, values) => {
    return `insert into ${table} (${fields}) VALUES (${values})`;
};
SqlRoot.SQL_REGISTER_USER_PS_3 = () => {
    return `insert into user_sp 
            (code_user,password,code_role,phone,"createdAt",status) VALUES ($1,$2,$3,$4,$5,$6)
    `;
};
SqlRoot.SQL_REGISTER_USER_PS = () => {
    return `
        with ins as (
	        INSERT INTO user_sp 
        	  (code_user,code_user_detail,password,code_role,phone,"createdAt",status,verification_code) 
	          VALUES 
	          ($1,$2,$3,$4,$5,$6,$7,$8)
	        RETURNING code_user_detail
        )
          INSERT INTO user_detail_sp 
          (code_user_detail, full_name, sex, code_restpass,"createdAT",email)
            VALUES
          ((select code_user_detail from ins),$9,$10,$11,$12,$13)
    `;
};
/**
 *
 * @param table table database
 * @param condition where update
 * @returns return sql update table set value
 */
SqlRoot.SQL_UPDATE_DATA = (table, condition) => {
    return `UPDATE ${table} SET ? WHERE ${condition} =($1)`;
};
SqlRoot.SQL_UPDATE_REFRESH_TOKEN_USER = () => {
    return `UPDATE users SET refresh_token=($1) WHERE phone=($2)`;
};
/**
 *
 * @param table table database
 * @param condition where condition delete
 */
SqlRoot.SQL_DELETE_DATA = (table, condition) => {
    return `DELETE FROM ${table} WHERE ${condition}=?`;
};
/**
 *
 * @param table table database
 * @param field field column table
 * @returns
 */
SqlRoot.SQL_GET_ALL = (table, field) => {
    return `SELECT * FROM ${table} ORDER BY ${field} DESC`;
};
SqlRoot.SQL_GET_ALL_NO_FIELD = (table, field) => {
    return `SELECT * FROM ${table}`;
};
SqlRoot.SQL_GET_ALL_BY_FIELD = (table) => {
    return `SELECT * FROM ${table} WHERE ??=? ORDER_BY ?? DESC`;
};
SqlRoot.SQL_GET_PAGINATE_LIST = (table) => {
    return `SELECT * FROM ${table} where ??=? ORDER_BY ?? DESC LIMIT ? OFFSET ?`;
};
/**
 *
 * @param table table database
 * @returns return pagination table
 */
SqlRoot.SQL_GET_PAGINATE_LIST_2 = (table) => {
    return `SELECT * FROM ${table} where ??=? AND ORDER_BY ?? DESC LIMIT ? OFFSET ?`;
};
SqlRoot.SQL_GET_ONE_USER_VERIFY_MAILER_CODE = () => {
    return `SELECT * FROM users where id=($1) AND verification_code=($2)`;
};
SqlRoot.SQL_GET_PRODUCT_BY_NAME_OR_CODE = () => {
    return `select p.*,pd.*,pg.*,
            pt.name_product_type,
            (select count(*) from product_sp where code_shop=p.code_shop) as shop_quatity_product,
            s.follow_shop,
            s.evaluate as evaluate_shop,
            s.image_shop,
            s.name_shop
            from product_sp p
            join product_detail_sp pd on p.code_product_detail=pd.code_product_detail 
            join product_guide_sp pg on pg.code_product_guide=pd.code_product_guide
            left join product_type_sp pt on pt.code_product_type=p.code_product_type 
            left join shop_sp s on s.code_shop=p.code_shop
            left join shop_detail_sp sd on sd.code_shop_detail=s.code_shop_detail
            where p.code_product=($1) OR name like ($2)`;
};
SqlRoot.SQL_GET_PRODUCT_ALL = () => {
    return `select * from product_sp p join product_detail_sp pd on 
            p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
            on pg.code_product_guide=pd.code_product_guide`;
};
SqlRoot.SQL_GET_COMMENT_ALL_BY_PRODUCT = () => {
    return `
        select cm.*,mess.*,u.avatar,u.code_user,ud.full_name from comment_sp cm 
          join message_sp mess on mess.code_message = cm.code_message 
          join product_sp p on p.code_product = cm.code_product 
          join user_sp u on u.code_user = cm.code_user
          join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
          where p.code_product=($1)
      `;
};
SqlRoot.SQL_GET_CART_BY_CODE_USER = () => {
    return ` select c.*,p.*,s.*,pd.discount,v.code_w_voucher,v.price_voucher,
                v.name_voucher,v.quality as quality_voucher,v.time_start,v.time_end,v.description
                from cart_sp c 
	              join user_sp u on u.code_user = c.code_user 
		            join product_sp p on p.code_product = c.code_product 
                join product_detail_sp pd on pd.code_product_detail = p.code_product_detail
                left join voucher_sp v on v.code_product = p.code_product
                left join shop_sp s on s.code_shop = p.code_shop
		            where u.code_user=($1)`;
};
/*public static SQL_ADD_CART_BY_CODE_USER = () => {
  return `INSERT INTO cart_sp (code_cart,code_user,code_product,quality_product,createdat)
          VALUES ($1,$2,$3,$4,$5)`
}*/
SqlRoot.SQL_ADD_CART_BY_CODE_USER = () => {
    return `
      INSERT INTO cart_sp (code_cart,code_user,code_product,quality_product,createdat)
      VALUES %L on conflict (code_cart)
      DO UPDATE SET quality_product=EXCLUDED.quality_product,createdat=EXCLUDED.createdat
    `;
};
SqlRoot.SQL_UPDATE_CART_BY_CODE_USER = () => {
    return `
      UPDATE cart_sp 
      SET 
      quality_product=($4),createdat=($5),code_product=($3) 
      where code_cart=($1) and code_user=($2)
    `;
};
SqlRoot.SQL_REMOVE_CART_BY_CODE_CART_AND_USER = () => {
    return `
      DELETE FROM cart_sp c
	    WHERE c.code_cart=($1) AND c.code_user=($2)
    `;
};
SqlRoot.SQL_GET_PRODUCT_BY_QUERY = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide 
    `;
};
SqlRoot.SQL_GET_COUNT_PRODUCT = () => {
    return `
      select count(*) from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
    `;
};
SqlRoot.SQL_UPDATE_USER_W1 = () => {
    return `
       with update_userSp as (
          UPDATE user_sp SET avatar=($1) where code_user=($2) RETURNING code_user_detail
       )
       UPDATE user_detail_sp SET full_name=($3),sex=($4),date_birth=($5) WHERE code_user_detail in (select code_user_detail from update_userSP)
    `;
};
SqlRoot.SQL_GET_ORDER_BY_USER = () => {
    return `
    SELECT o.*,od.*,
      u.code_user,
      u.avatar,
      u.phone,
      (select string_agg(p.name,' , ') from order_sp ow
	        cross join jsonb_to_recordset(ow.code_product) as al(code varchar)
	        inner join product_sp p on p.code_product = al.code
 	        where ow.code_order= o.code_order
      ) as name_product,
      (select json_agg((eps.code_product)) from order_sp ow
	        cross join jsonb_to_recordset(ow.code_product) as al(code varchar)
	        inner join product_sp p on p.code_product = al.code
	  		inner join evaluate_product_sp eps on eps.code_product=al.code
 	        where ow.code_order= o.code_order
      ) as check_evaluate,
      (select string_agg(p.image,' , ') from order_sp ow
	        cross join jsonb_to_recordset(ow.code_product) as al(code varchar)
	        inner join product_sp p on p.code_product = al.code
 	        where ow.code_order= o.code_order
      ) as image_product,
      s.* 
      FROM order_sp o 
        join user_sp u on u.code_user = o.code_user
        left join user_detail_sp ud  on ud.code_user_detail = u.code_user_detail
        join order_detail_sp od on od.code_order_detail = o.code_order_detail
        left join shop_sp s on s.code_shop = od.code_shop   
        where u.code_user = ($1) ORDER BY o.date_order DESC
    `;
};
SqlRoot.SQL_GET_COUNT_ORDER_BY_USER = () => {
    return `
      SELECT 
      count(*)
      FROM order_sp o 
      join user_sp u on u.code_user = o.code_user 
      left join user_detail_sp ud  on ud.code_user_detail = u.code_user_detail  
      join order_detail_sp od on od.code_order_detail = o.code_order_detail 
      where u.code_user = ($1)
    `;
};
SqlRoot.SQL_GET_ADDRESS_BY_USER = () => {
    return `
    select ar.*,ard.* from address_sp ar 
    join address_detail_sp ard on ar.code_address_detail = ard.code_address_detail 
    join user_sp u on u.code_user = ar.code_user 
    where u.code_user=($1)
    `;
};
SqlRoot.SQL_CHECK_COUNT_ADDRESS_BY_USER = () => {
    return `
    select  count(*) from address_sp where code_user=($1)
    `;
};
SqlRoot.SQL_CHECK_ADDRESS_PHONE_IS_EMPTY_BY_USER = () => {
    return `
      select count(*) from address_sp where phone=($1) and code_user=($2)
    `;
};
SqlRoot.SQL_INSERT_ADDRESS_BY_USER = () => {
    return `
        with insAddress_address as (
          INSERT INTO address_sp
          (code_address, code_user, full_name, phone, detail_address, status, code_address_detail)
            VALUES 
          ($1, $2, $3, $4, $5, $6, $7)
        RETURNING code_address_detail
        )
        INSERT INTO address_detail_sp(
	        code_address_detail, phone_w, email,street, village, district, city)
	      VALUES ((select code_address_detail from insAddress_address), $4, $8, $9, $10, $11, $12);
      `;
};
SqlRoot.SQL_GET_DETAIL_ADDRESS_USER_BY_CODE = () => {
    return `
      select 
          *
        from 
          address_sp a
        join 
          address_detail_sp ad on ad.code_address_detail = a.code_address_detail
        where
	        a.code_address=($1) and a.code_user=($2)
    `;
};
SqlRoot.SQL_UPDATE_ADDRESS_USER_BY_CODE = () => {
    return `
      with updateAddressSp_update as (
        UPDATE address_sp
          SET full_name=($3), phone=($4), detail_address=($5), status=($6)
         WHERE code_address=($1) AND code_user=($2) 
  	  RETURNING code_address_detail
    )
    UPDATE address_detail_sp
        SET phone_w=($4), email=($7), street=($8), village=($9), district=($10), city=($11)
      WHERE code_address_detail in (select code_address_detail from updateAddressSp_update);
    `;
};
SqlRoot.SQL_UPDATE_STATUS_ADDRESS_BY_USER = () => {
    return `
      UPDATE address_sp
	      SET  status=($1)
	    WHERE code_user=($2) AND code_address!=($3)
    `;
};
SqlRoot.SQL_GET_ORDER_DETAIL_BY_USER = () => {
    //join product_sp p on p.code_product = ANY (o.code_product)
    return `
      SELECT 
      o.*,od.*,
      u.code_user,
      u.avatar,
      u.phone,
      s.*,
      sd.phone as phone_shop,
      sd.email as email_shop,
      ad.full_name,
      ad.detail_address,
      adt.phone_w as phone_w_detail,
      adt.street,
      adt.village,
      adt.district,
      adt.city,
      (select json_agg((eps.code_product)) from order_sp ow
	        cross join jsonb_to_recordset(ow.code_product) as al(code varchar)
	  		  inner join evaluate_product_sp eps on trim(trailing  ' 'from eps.code_product)=al.code
 	        where eps.code_order=o.code_order
      ) as check_evaluate,
      ( 
	   select json_agg(row_to_json((p.*)))  AS product_order
      from order_sp ow
      cross join jsonb_to_recordset(o.code_product) as al(code varchar)
      inner join product_sp p on p.code_product = al.code
      where ow.code_order=o.code_order )
      FROM order_sp o 
      join user_sp u on u.code_user = o.code_user 
      left join user_detail_sp ud  on ud.code_user_detail = u.code_user_detail  
      join order_detail_sp od on od.code_order_detail = o.code_order_detail 
      left join shop_sp s on s.code_shop = od.code_shop
      left join shop_detail_sp sd on sd.code_shop_detail = s.code_shop_detail
      left join address_sp ad on ad.code_address = o.code_address
      join address_detail_sp adt on adt.code_address_detail = ad.code_address_detail
      where u.code_user =($1) and o.code_order =($2)
    `;
};
SqlRoot.SQL_GET_USER_ADMIN = () => {
    return `
          SELECT u.*,ud.* FROM user_sp u 
          left 
          join user_detail_sp ud 
          on u.code_user_detail=ud.code_user_detail 
          join role_sp r on r.code_role = u.code_role
          where u.user_name = ($1) AND r.code_role='ROLE-WIXX-SHOP'

    `;
};
SqlRoot.SQL_GET_USER_W = () => {
    return `
      select * from user_sp u where u.code_user=($1)
    `;
};
SqlRoot.SQL_GET_CHECK_VERIFICATION_LOGIN_ADMIN = () => {
    return `
          SELECT u.*,ud.* FROM user_sp u 
          left 
          join user_detail_sp ud 
          on u.code_user_detail=ud.code_user_detail 
          join role_sp r on r.code_role = u.code_role
          where u.user_name = ($1) AND r.code_role='ROLE-WIXX-SHOP' and u.status=-1

    `;
};
SqlRoot.SQL_GET_ME_SHOP = () => {
    return `
    SELECT s.*,sd.* FROM user_sp u
    left join user_detail_sp ud on u.code_user_detail=ud.code_user_detail
    join role_sp r on r.code_role = u.code_role
    join shop_sp s on s.code_shop= u.code_shop
    join shop_detail_sp sd on sd.code_shop_detail = s.code_shop_detail
    where u.code_user = ($1) AND r.code_role='ROLE-WIXX-SHOP'
    `;
};
SqlRoot.SQL_GET_ME_USER = () => {
    return `
    SELECT u.*,ud.* FROM user_sp u
    join user_detail_sp ud on u.code_user_detail=ud.code_user_detail
    join role_sp r on r.code_role = u.code_role
    where u.code_user = ($1) AND r.code_role='ROLE-WIXO-USER'
    `;
};
SqlRoot.SQL_GET_ALL_CATEGORY_PRODUCT_BY_SHOP = () => {
    return ` 
    select 
      json_agg(row_to_json(pt.*)) as category_product
    from 
      product_type_sp pt  
    join 
      product_sp p on p.code_product_type=pt.code_product_type
    and  
      p.code_shop=($1)
    `;
};
SqlRoot.SQL_GET_PRODUCT_BY_SHOP = () => {
    return `
      select *,(select MAX(pm.price) from product_sp pm where pm.code_shop=p.code_shop) as max_price  
      from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      left join shop_sp s on s.code_shop = p.code_shop
      where p.code_shop=($1) 
    `;
};
SqlRoot.SQL_GET_COUNT_PRODUCT_BY_SHOP = () => {
    return `
      select count(*) from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      left join shop_sp s on s.code_shop = p.code_shop 
      where p.code_shop=($1) 
    `;
};
SqlRoot.SQL_GET_PRODUCT_BY_TOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      ORDER BY p.evaluate DESC
    `;
};
SqlRoot.SQL_GET_PRODUCT_BY_PAY_TOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      ORDER BY pd.purchase DESC
    `;
};
SqlRoot.SQL_GET_PRODUCT_BY_NEW_SHOP = () => {
    return `
      select * from product_sp p 
      join product_detail_sp pd on p.code_product_detail=pd.code_product_detail 
      join product_guide_sp pg on pg.code_product_guide=pd.code_product_guide
      join shop_sp s on s.code_shop = p.code_shop
      join shop_detail_sp sd on sd.code_shop_detail = s.code_shop_detail
      where pd.is_show=1
      ORDER BY (sd."createdAt" IS NULL) DESC
    `;
};
SqlRoot.SQL_GET_CATEGORY_PRODUCT_BY_SHOP = () => {
    return `
      select DISTINCT c.*,(select count(*) from product_detail_sp pd  
      join product_sp p on p.code_product_detail = pd.code_product_detail
      cross join jsonb_to_recordset(pd.category_code) as al(code varchar)
      inner join category_sp cd on cd.category_code=al.code
      where p.code_shop=($1) and cd.category_code=c.category_code) as quality_product_category
        from product_detail_sp pd  
        join product_sp p on p.code_product_detail = pd.code_product_detail
        cross join jsonb_to_recordset(pd.category_code) as al(code varchar)
        inner join category_sp c on c.category_code=al.code
        where p.code_shop=($1)
    `;
};
SqlRoot.SQL_ADD_PRODUCT_BY_SHOP = () => {
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
    `;
};
SqlRoot.SQL_GET_ALL_CATEGORY_BY_SHOP = () => {
    return 'select * from category_sp c where c.code_shop=($1)';
};
SqlRoot.SQL_GET_PRODUCT_BY_CODE_AND_SHOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      WHERE p.code_shop=($1) and p.code_product=($2)
    `;
};
SqlRoot.SQL_GET_ALL_PRODUCT_BY_ORDER_AND_SHOP = () => {
    return `
      select p.* from order_sp o 
      join order_detail_sp od on od.code_order_detail = o.code_order_detail
      cross join jsonb_to_recordset(o.code_product) as al(code varchar)
      inner join product_sp p on p.code_product = al.code
      where od.code_shop = ($1)
    `;
};
SqlRoot.SQL_GET_ALL_ORDER_BY_SHOP = () => {
    return `
      select o.*,od.*,pm.*,u.user_name,u.phone,
      ud.full_name,
      ud.date_birth,
      ud.sex,
      ad.full_name as full_name_address,
      ad.detail_address,
      adt.phone_w as phone_w_detail,
      adt.street,
      adt.village,
      adt.district,
      adt.city,
      ( 
	    select json_agg(row_to_json((p.*)))  AS product_order
      from order_sp ow
      cross join jsonb_to_recordset(o.code_product) as al(code varchar)
      inner join product_sp p on p.code_product = al.code
      where ow.code_order=o.code_order )
      from order_sp o 
      join order_detail_sp od on od.code_order_detail = o.code_order_detail
      join user_sp u on u.code_user=o.code_user
      join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
      left join payment_sp pm on pm.code_payment = od.code_payment
      left join address_sp ad on ad.code_address = o.code_address
      join address_detail_sp adt on adt.code_address_detail = ad.code_address_detail
      where od.code_shop=($1) 
    `;
};
SqlRoot.SQL_COUNT_ALL_ORDER_BY_SHOP = () => {
    return `
      select count(*)
      from order_sp o 
      join order_detail_sp od on od.code_order_detail = o.code_order_detail
      join user_sp u on u.code_user=o.code_user
      join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
      left join payment_sp pm on pm.code_payment = od.code_payment
      left join address_sp ad on ad.code_address = o.code_address
      join address_detail_sp adt on adt.code_address_detail = ad.code_address_detail
      where od.code_shop=($1) 
    `;
};
SqlRoot.SQL_GET_ORDER_DETAIL_BY_ORDER_AND_SHOP = () => {
    return `
      select o.*,od.*,pm.*,u.user_name,u.phone,
      ud.full_name,
      ud.date_birth,
      ud.sex,
      ad.full_name,
      ad.detail_address,
      adt.phone_w as phone_w_detail,
      adt.street,
      adt.village,
      adt.district,
      adt.city,
      ( 
	    select json_agg(row_to_json((p.*)))  AS product_order
      from order_sp ow
      cross join jsonb_to_recordset(o.code_product) as al(code varchar)
      inner join product_sp p on p.code_product = al.code
      where ow.code_order=o.code_order )
      from order_sp o 
      join order_detail_sp od on od.code_order_detail = o.code_order_detail
      join user_sp u on u.code_user=o.code_user
      join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
      left join payment_sp pm on pm.code_payment = od.code_payment
      left join address_sp ad on ad.code_address = o.code_address
      join address_detail_sp adt on adt.code_address_detail = ad.code_address_detail
      where od.code_shop=($1) and o.code_order=($2)
    `;
};
SqlRoot.SQL_HIDE_ORDER_BY_SHOP = () => {
    return `
        UPDATE order_sp SET is_show=($1)
        where code_shop=($2) and code_order=($3)
      `;
};
SqlRoot.SQL_REMOVE_ORDER_SHOP = () => {
    return `

      `;
};
SqlRoot.SQL_GET_ALL_PRODUCT_TYPE = () => {
    return `
      select * from product_type_sp pt where pt.code_shop=($1)
    `;
};
SqlRoot.SQL_ADD_TYPE_PRODUCT = () => {
    return `
      INSERT INTO product_type_sp
      (code_product_type, name_product_type, status, code_shop)
      VALUES 
      ($1,$2,$3,$4)
    `;
};
SqlRoot.SQL_REMOVE_PRODUCT_BY_SHOP = () => {
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
    `;
};
SqlRoot.SQL_SEARCH_PRODUCT_BY_SHOP = () => {
    return `
      select * from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      left join shop_sp s on s.code_shop = p.code_shop 
      where p.code_shop=($1) 
    `;
};
SqlRoot.SQL_GET_COUNT_SEARCH_PRODUCT_BY_SHOP = () => {
    return `
      select count(*) from product_sp p join product_detail_sp pd on 
      p.code_product_detail=pd.code_product_detail join product_guide_sp pg 
      on pg.code_product_guide=pd.code_product_guide
      left join shop_sp s on s.code_shop = p.code_shop 
      where p.code_shop=($1) or p.name like ($2) or p.code_product=($2)
    `;
};
SqlRoot.SQL_UPDATE_PRODUCT_BY_CODE_AND_SHOP = () => {
    return `
        with productSp_update as ( UPDATE product_sp
      	  SET 
	        image=($3), name=($4), price=($5), quality=($6), code_product_type=($7) 
	        where code_product=($1) and code_shop=($2)
	        RETURNING code_product_detail
        ),productDetailSp_update as (
	        UPDATE product_detail_sp 
	        SET 
          "updatedAt"=($8), 
	        type_product=($9), date_start=($10), date_end=($11), category_code=($12), is_show=($13), 
	        images=($14), free_ship=($15) 
          where code_product_detail IN (select code_product_detail from productSp_update)
	        RETURNING code_product_guide
        )
	        UPDATE product_guide_sp
	        SET
  	      description=($16), guide=($17), "return"=($18), note=($19)
	        where code_product_guide in (select code_product_guide from productDetailSp_update)
    `;
};
SqlRoot.SQL_CHECK_USER_REGISTER = () => {
    return `
        select count(*) from user_sp where user_name=($1) or phone=($2)
      `;
};
SqlRoot.SQL_REGISTER_SHOP = () => {
    return `
          with ins_userSP as (
	          INSERT INTO user_sp 
		          (code_user,code_user_detail,avatar,user_name,password,code_role,phone,"createdAt",status,code_shop,verification_code,code_type_login)
	          VALUES
		          ($1,$2,$3,$4,$5,$6,$7,$8,$9,$29,$10,$11)
	          RETURNING code_user_detail,code_user
          ),ins_userDetailSP as (
            INSERT INTO user_detail_sp
		          (code_user_detail, full_name, sex, code_restpass, date_birth, "createdAT",email)
	        VALUES 
		        ((select code_user_detail from ins_userSP),$12,$13,$14,$15,$16,$24) 
          ),ins_addressSP as (
	          INSERT INTO address_sp 
		          (code_address, code_user, full_name, phone, detail_address, status, code_address_detail)
	          VALUES 
		          ($17,(select code_user from ins_userSP),$18,$19,$20,$21,$22)
	          RETURNING code_address_detail
          ),ins_addressDetailSP as (
            INSERT INTO address_detail_sp 
		          (code_address_detail, phone_w, email, street, village, district, city)
	          VALUES 
		          ((select code_address_detail from ins_addressSP),$23,$24,$25,$26,$27,$28)
          ),ins_shopSP as (
	          INSERT INTO shop_sp 
	            (code_shop, image_shop, name_shop, evaluate, follow_shop, code_shop_detail, type_shop)
	          VALUES
	            ($29,$3,$30,0,0,$31,2)
            RETURNING code_shop_detail
          )
            INSERT INTO shop_detail_sp
              (code_shop_detail,full_name,email,date,phone,description,"createdAt",status,check_shop,censorship_shop)
	          VALUES 
              ((select code_shop_detail from ins_shopSP),$18,$24,$15,$7,$32,$8,false,1,1)
      `;
};
SqlRoot.SQL_INSERT_ORDER_USER = () => {
    return `
            with ins_orderSP as (
	            INSERT INTO order_sp
	              (code_order, code_user, code_address, date_order, status, code_order_detail, code_product, status_order)
	                VALUES 
	              ($1,$2,$3,$4,$5,$6,$7,$8)
	            RETURNING code_order_detail
            )
              INSERT INTO order_detail_sp
	              (code_order_detail, phone_order, phone_shipw, code_payment, code_shop, total_order, quatity, progress)
	          VALUES 
                ((select code_order_detail from ins_orderSP ),$9,$10,$11,$12,$13,$14,$15)
      `;
};
SqlRoot.SQL_GET_ALL_PAYMENT = () => {
    return `
      select * from payment_sp
    `;
};
SqlRoot.SQL_REMOVE_CART_BY_CODE = () => {
    return `
      DELETE FROM cart_sp where code_user=($1) 
    `;
};
SqlRoot.SQL_GET_CATEGRY_BY_PRODUCT = () => {
    return `

    `;
};
SqlRoot.SQL_GET_TYPE_PRODUCT_BY_PRODUCT = () => {
    return `
    `;
};
SqlRoot.SQL_UPDATE_ORDER_BY_CODE_ORDER = () => {
    return `
    with codeOrder_OrderSP as (
	    select od.code_order_detail from order_sp o 
      join order_detail_sp od on od.code_order_detail = o.code_order_detail 
      where o.code_order=($1) and od.code_shop=($2) 
    )
    UPDATE order_detail_sp SET progress=($3) 
    where code_order_detail=(select code_order_detail from codeOrder_OrderSP) 
    `;
};
SqlRoot.SQL_GET_DETAIL_SHOP = () => {
    return `
      select 
	      s.code_shop,
	      s.evaluate,
	      s.follow_shop,
	      s.name_shop,
	      s.type_shop,
	      s.video_shop,
	      sd.facebook,
        s.image_shop,
	      sd.phone,
	      sd.youtube,
	      sd.description,
        sd.background_shop,
	      sd."createdAt",
        ((select 
	          CASE 
	  	        WHEN f.code_user IS NULL THEN FALSE ELSE TRUE
	          END as is_follow
	        from follow_shop_sp f where f.code_user=($2) and f.code_shop=($1)
	      ))
	      from shop_sp s
      join shop_detail_sp sd  on sd.code_shop_detail=s.code_shop_detail where s.code_shop=($1)
    `;
};
SqlRoot.SQL_GET_ALL_CATEGORY_BY_PRODUCT_SHOP = () => {
    return `
    select json_agg(row_to_json((ct.*)))  AS category_all from product_sp p 
	 join product_detail_sp pd on p.code_product_detail=pd.code_product_detail 
	 join product_guide_sp pg
	 on pg.code_product_guide=pd.code_product_guide
	 left join shop_sp s on s.code_shop = p.code_shop 
	 cross join jsonb_to_recordset(pd.category_code) as al(code varchar)
	 inner join category_sp ct on ct.category_code=al.code
	 where p.code_shop=($1)
    `;
};
SqlRoot.SQL_FOLLOW_SHOP_BY_USER = () => {
    return `
    INSERT INTO follow_shop_sp(
	    code_follow, code_user, code_shop
    )
	  SELECT '($1)','($2)','($3)'
		  WHERE NOT EXISTS(
		  SELECT code_follow,code_user,code_shop
		  FROM follow_shop_sp
		  WHERE follow_shop_sp.code_user=($2) and follow_shop_sp.code_shop=($3)
    )
    `;
};
SqlRoot.SQL_INSERT_NOTIFY_SHOP = () => {
    return `
      INSERT INTO notify_shop_sp
      (code_notifiy_shop, code_shop, title, info, code_type_notify, "createdAt")
      VALUES ($1,$2,$3,$4,$5,$6)
    `;
};
SqlRoot.SQL_GET_ALL_NOTIFY_SHOP = () => {
    return `
      select * from notify_shop_sp where code_shop=($1) 
    `;
};
SqlRoot.SQL_GET_DETAIL_NOTIFY_SHOP = () => {
    return `
      select * from notify_shop_sp where code_shop=($1) and code_notifiy_shop=($2)
    `;
};
SqlRoot.SQL_SEND_MESSENGER_CHAT = () => {
    return `
       INSERT INTO chat_sp 
       (code_chat, code_user, type_chat, text_chat, time_chat, room_chat, code_shop)
       values 
       ($1,$2,$3,$4,$5,$6,$7)
    `;
};
SqlRoot.SQL_GET_ALL_MESSENGER_CHAT_BY_CODE_USER = () => {
    return `
      with resultMess as (
	      select 
		      u.avatar,
          u.phone,
          u.code_user,
          u.user_name,
          ud.facebook,
          c.*
          from chat_sp c 
          join user_sp u on u.code_user = c.code_user
          join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
        where u.code_user=($1) and c.code_shop=($2) ORDER BY  c.time_chat DESC LIMIT($3)
      )
      select ROW_NUMBER() OVER (ORDER BY 1) AS id,s.*  FROM resultMess s ORDER BY id DESC
    `;
};
SqlRoot.SQL_GET_ALL_MESSENGER_CHAT_SHOP_BY_CODE_USER = () => {
    return `
    with  resultMess as (
	      select 
		      u.avatar,
          u.phone,
          u.code_user,
          u.user_name,
          ud.facebook,
          c.*
          from chat_sp c 
          join user_sp u on u.code_user = c.code_user
          join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
        where u.code_user=($1) and c.code_shop=($2) ORDER BY  c.time_chat DESC LIMIT($3)
      )
      select ROW_NUMBER() OVER (ORDER BY 1) AS id,s.*  FROM resultMess s ORDER BY id DESC
    `;
};
SqlRoot.SQL_GET_ALL_USER_MESSENGER_BY_SHOP = () => {
    return `
    SELECT u.code_user,ud.full_name,u.avatar from chat_sp c
    join user_sp u on u.code_user = c.code_user
    join shop_sp s on s.code_shop = c.code_shop 
    join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
    where c.code_shop = ($1)
    GROUP BY u.code_user,ud.full_name,u.avatar
    HAVING COUNT(*)>=1
    `;
};
SqlRoot.SQL_CHECK_EVALUATE_BY_PRODUCT_USER_ORDER = () => {
    return `
      select count(*) from evaluate_product_sp where code_user=($1) and code_product=($2) and code_order=($3)
    `;
};
SqlRoot.SQL_GET_NAME_PRODUCT_BY_TEXT = () => {
    return `
      select p.name,p.code_product,p.image from product_sp p
    `;
};
SqlRoot.SQL_GET_COUNT_SHOP_NAME_PRODUCT_BY_TEXT = () => {
    return `
      select count(*) from shop_sp s
    `;
};
SqlRoot.SQL_GET_SHOP_BY_NAME_OR_CODE = () => {
    return `
      select 
        s.name_shop,
        s.code_shop,
        s.image_shop,
        s.follow_shop,
        s.evaluate,
        s.type_shop,
        sd."createdAt",
         ((select count(*) from product_sp p where p.code_shop=s.code_shop)) as quatity_product
      from 
	      shop_sp s 
        join shop_detail_sp sd on sd.code_shop_detail=s.code_shop_detail

    `;
};
SqlRoot.SQL_ADD_EVALUATE_BY_PRODUCT = () => {
    return `
       INSERT INTO evaluate_product_sp (
        code_evaluate, code_user, code_product, evaluate_product, evaluate_ship, evaluate_progress, images, text, "createdAt", code_order
      )
      SELECT ($1)::varchar(15),
             ($2)::varchar(15),
             ($3)::varchar(15),
             ($4)::bigint,
             ($5)::bigint,
             ($6)::bigint,
             ($7)::jsonb,
             ($8)::text,
             ($9)::timestamp,
             ($10)::varchar(15)
 	        WHERE NOT EXISTS (
            SELECT 
              code_evaluate::varchar(15), 
              code_user::varchar(15), 
              code_product::varchar(15), 
              evaluate_product::bigint, 
              evaluate_ship::bigint, 
              evaluate_progress::bigint, 
              images::jsonb, 
              text::text, 
              "createdAt"::timestamp,
              code_order::varchar(15)
            FROM 
              evaluate_product_sp eps
            WHERE 
              eps.code_order=($10) and eps.code_product=($3) and eps.code_user=($2)
	    )
    `;
};
SqlRoot.SQL_GET_COUNT_EVALUATE_BY_PRODUCT = () => {
    return `
    select count(*) from evaluate_product_sp ep 
			join user_sp u on u.code_user = ep.code_user
			join user_detail_sp ud on ud.code_user_detail = u.code_user_detail
			 where ep.code_product=($1)
  `;
};
SqlRoot.SQL_GET_EVALUATE_BY_PRODUCT = () => {
    return `
    select ep.*,u.avatar,ud.full_name from evaluate_product_sp ep 
			join user_sp u on u.code_user = ep.code_user
			join user_detail_sp ud on ud.code_user_detail = u.code_user_detail 
			where trim(trailing  ' 'from ep.code_product) =($1) LIMIT ($2)
  `;
};
SqlRoot.SQL_GET_EVALUATE_PRODUCT_5 = () => {
    return `
      	select count(*)  from evaluate_product_sp ep 
        where trim(trailing ' ' from ep.code_product) =($1) and ep.evaluate_product = 5
      `;
};
SqlRoot.SQL_GET_COUNT_ALL_EVALUATE_PRODUCT = () => {
    return `
      	select count(*)  from evaluate_product_sp ep 
        where trim(trailing ' ' from ep.code_product) =($1)
      `;
};
SqlRoot.SQL_GET_EVALUATE_PRODUCT_4 = () => {
    return `
      	select count(*)  from evaluate_product_sp ep 
        where trim(trailing ' ' from ep.code_product) =($1) and ep.evaluate_product = 4
      `;
};
SqlRoot.SQL_GET_EVALUATE_PRODUCT_3 = () => {
    return `
      	select count(*)  from evaluate_product_sp ep 
        where trim(trailing ' ' from ep.code_product) =($1) and ep.evaluate_product = 3
      `;
};
SqlRoot.SQL_GET_EVALUATE_PRODUCT_2 = () => {
    return `
      	select count(*)  from evaluate_product_sp ep 
        where trim(trailing ' ' from ep.code_product) =($1) and ep.evaluate_product = 2
      `;
};
SqlRoot.SQL_GET_EVALUATE_PRODUCT_1 = () => {
    return `
      	select count(*)  from evaluate_product_sp ep 
        where trim(trailing ' ' from ep.code_product) =($1) and ep.evaluate_product = 1
      `;
};
SqlRoot.SQL_INSERT_CODE_VERIFICATION_TABLE_OTP = () => {
    return `
        insert into otp (code_otp , otp_text,status,"createAt","endTime",type)
        VALUES ($1,$2,$3,$4,$5,2)
      `;
};
SqlRoot.SQL_AUTH_CHECK_VERIFICATION_BY_USER = () => {
    return `
      select count(*) from user_sp  where user_name=($1) and verification_code=($2) and code_role='ROLE-WIXX-SHOP'
    `;
};
SqlRoot.SQL_AUTH_IS_VERIFICATION_BY_USER = () => {
    return `
          select count(*) from user_sp  where user_name=($1) and verification_code=($2) and code_role='ROLE-WIXX-SHOP' and status=1
    `;
};
SqlRoot.SQL_ACTIVE_ACCOUNT_SHOP_BY_USER = () => {
    return `
      UPDATE user_sp SET status=1 WHERE user_name=($1)
    `;
};
SqlRoot.SQL_AUTH_GET_VERIFICATION_ACCOUNT_BY_USER_NAME = () => {
    return `
      select 
        u.verification_code,
        ud.email
      from 
        user_sp u 
      join 
        user_detail_sp ud on ud.code_user_detail = u.code_user_detail
      where user_name=($1) and u.code_role='ROLE-WIXX-SHOP'
    `;
};
SqlRoot.SQL_GET_DATA_HOME_STATISTICAL = () => {
    return `
      with count_product as (
        select 
          count(p.*) as count_all_product
        from 
          shop_sp s 
        join 
          product_sp p on p.code_shop = s.code_shop
        where 
          s.code_shop=($1)
      ), count_order as (
        select 
          count(od.*) as count_order
        from 
          shop_sp s 
          join 
            order_detail_sp od on od.code_shop = s.code_shop
          join 
            order_sp o on o.code_order_detail = od.code_order_detail
        where 
          s.code_shop=($1)
      ),count_order_ship as (
        select 
          count(od.*) as count_order_ship
        from 
          shop_sp s 
          join 
            order_detail_sp od on od.code_shop = s.code_shop
          join 
            order_sp o on o.code_order_detail = od.code_order_detail
        where 
          s.code_shop=($1) and od.progress =3
      ),count_order_notShip as (
        select 
          count(od.*) as count_order_not_ship
        from 
          shop_sp s 
          join 
            order_detail_sp od on od.code_shop = s.code_shop
          join 
            order_sp o on o.code_order_detail = od.code_order_detail
        where 
          s.code_shop=($1) and od.progress = 8 
      ),count_order_successShip as (
        select 
          count(od.*) as count_order_success_ship
        from 
          shop_sp s 
          join 
            order_detail_sp od on od.code_shop = s.code_shop
          join 
            order_sp o on o.code_order_detail = od.code_order_detail
        where 
          s.code_shop=($1) and od.progress = 7
      ),count_product_evaluateTop as (
        select 
          count(p.*) as count_product_evaluateTop
        from 
          shop_sp s 
          join 
            product_sp p on p.code_shop = s.code_shop
        where 
          s.code_shop=($1) and p.evaluate  < 5
      ),count_product_evaluateLeast as (
        select 
          count(p.*) as count_product_evaluateLeast
        from 
          shop_sp s 
          join 
            product_sp p on p.code_shop = s.code_shop
        where 
          s.code_shop=($1) and p.evaluate  > 6
      )
        select * from count_product,count_order,count_order_ship,count_order_notShip,count_order_successShip,count_product_evaluateTop,count_product_evaluateLeast
    `;
};
SqlRoot.SQL_AUTH_UPDATE_USER_SHOP_BY_CODE = () => {
    return `
      with shop_sp_UpdateShop as (
        UPDATE shop_sp SET image_shop=($2),name_shop=($3) where code_shop=($1)
        RETURNING code_shop_detail 
      )
      UPDATE shop_detail_sp SET full_name=($4),email=($5),phone=($6),facebook=($7),background_shop=($8),description=($9),youtube=($10)
        WHERE code_shop_detail in (select code_shop_detail from shop_sp_UpdateShop)
    `;
};
SqlRoot.SQL_ADD_CATEGORY_BY_SHOP = () => {
    return `
      INSERT INTO category_sp(
         category_code, category_name, category_image, category_info, status, code_shop)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;
};
SqlRoot.SQL_CHECK_NAME_CATEGORY_BY_SHOP = () => {
    return `
      SELECT count(*) from category_sp where  lower(converttvkdau(category_name))= ($1) and code_shop=($2)
    `;
};
SqlRoot.SQL_REMOVE_CATEGORY_BY_SHOP = () => {
    return `
      DELETE FROM category_sp WHERE category_code=($1) and code_shop=($2)
    `;
};
SqlRoot.SQL_UPDATE_CATEGORY_BY_SHOP = () => {
    return `
      UPDATE category_sp SET category_name=($3),category_image=($4),category_info=($5),status=($6) WHERE category_code =($1) and code_shop =($2)
    `;
};
SqlRoot.SQL_DISABLE_FOLLOW_SHOP_BY_USER = () => {
    return `
      DELETE FROM follow_shop_sp where code_user=($1) AND code_shop=($2)
    `;
};
SqlRoot.SQL_GET_ALL_VOUCHER_BY_SHOP = () => {
    return `
      select 
        * 
      from 
        voucher_sp v 
      join 
        voucher_type_sp vt on vt.code_type_voucher = v.code_type_voucher 
      where 
        v.code_shop=($1)
    `;
};
SqlRoot.SQL_GET_DATA_USER_BY_CODE_USER_SHOP = () => {
    return `
      select 
        *
      from 
        user_sp u
      where 
        u.code_shop=($1) and u.user_name=($2)
    `;
};
SqlRoot.SQL_CHECK_VOUCHER_PRODUCT_BY_SHOP = (code_product) => {
    return `
      select distinct
        v.price_voucher
      from 
        voucher_sp v
      cross join jsonb_to_recordset('${code_product}') as al(code_product varchar)
      inner join product_sp p on trim(trailing ' 'from p.code_product)=al.code_product
      where v.code_w_voucher=($1)
      `;
};
SqlRoot.SQL_ADD_NEW_VOUCHER_BY_SHOP = () => {
    return `
        INSERT INTO voucher_sp 
          (code_voucher,name_voucher,
          price_voucher,code_type_voucher,
          description,code_w_voucher,
          time_start,time_end,
          createdat,
          quality,code_shop,
          code_product,type_price
          )
        VALUES
          (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
          )
    `;
};
SqlRoot.SQL_UPDATE_VOUCHER_BY_CODE_VOUCHER_AND_SHOP = () => {
    return `
        UPDATE voucher_sp SET 
          name_voucher=($1),
          price_voucher=($2),
          code_type_voucher=($3),
          description=($4),
          code_w_voucher=($5),
          time_start=($6),
          time_end=($7),
          updatedat=($8),
          quality=($9),
          code_product=($10),
          type_price=($11)
          WHERE code_shop=($12) AND code_voucher=($13)
    `;
};
SqlRoot.SQL_REMOVE_VOUCHER_BY_SHOP_AND_VOUCHER = () => {
    return `
      DELETE FROM voucher_sp where code_shop=($1) AND code_voucher=($2)
    `;
};
SqlRoot.SQL_GET_DETAIL_VOUCHER_SHOP_BY_CODE = () => {
    return `
       select 
        * 
      from 
        voucher_sp v 
      join 
        voucher_type_sp vt on vt.code_type_voucher = v.code_type_voucher 
      where 
        v.code_shop=($1) and v.code_voucher=($2)
    `;
};
SqlRoot.SQL_UPDATE_USER_PASSWORD = () => {
    return `
    UPDATE user_sp
    SET password=($1)
    WHERE code_user=($2)
    `;
};
SqlRoot.SQL_UPDATE_USER_NEW_PASSWORD = () => {
    return `
    UPDATE user_sp
    SET password=($1)
    WHERE phone=($2)
    `;
};
SqlRoot.SQL_GET_ALL_NOTIFY_USER = () => {
    return `
        select * from notify_sp where code_user=($1)
    `;
};
exports.default = SqlRoot;
