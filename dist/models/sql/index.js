"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqlRoot {
}
SqlRoot.SQL_GET_USER_PHONE = () => {
    return `select * from users where phone=($1)`;
};
SqlRoot.SQL_GET_USER_USER_NAME = () => {
    return `select * from users where username=($1)`;
};
SqlRoot.SQL_GET_USER = () => {
    return `select * from users where phone=($1) OR username=($2)`;
};
SqlRoot.SQL_LOGIN_USER_FULL = () => {
    return `select * from users where phone=($1) AND username=($2)`;
};
SqlRoot.SQL_LOGIN_USER = (table) => {
    return `select * from users where phone=($1) OR user_name=($2)`;
};
/**
 *
 * @param table table database select
 * @returns  return sql select table where value
 */
SqlRoot.SQL_GET_ONE = (table, field) => {
    return `select * from ${table} where ${field}=($1)`;
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
/**
 *
 * @param table table database
 * @param condition where update
 * @returns return sql update table set value
 */
SqlRoot.SQL_UPDATE_DATA = (table, condition) => {
    return `UPDATE ${table} SET ? WHERE ${condition} =?`;
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
exports.default = SqlRoot;
