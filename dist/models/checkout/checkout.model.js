"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModel = void 0;
const database_1 = __importDefault(require("../../database"));
const pg_format_1 = __importDefault(require("pg-format"));
const make_id_1 = require("../../libs/make_id");
const Model_1 = __importDefault(require("../Model"));
const timeVietNam_1 = require("../../libs/timeVietNam");
class CheckoutModel extends Model_1.default {
    static checkoutOrderUserModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const data_product_result = [];
            const data_product_result_2 = [];
            if (data.data_product) {
                const arrDataProduct = data.data_product;
                arrDataProduct.map((item) => {
                    const code_order_detail = (0, make_id_1.makeId)(15);
                    const dataSQL = [
                        (0, make_id_1.makeId)(15),
                        data.data_user.code_user,
                        item.code_address,
                        (0, timeVietNam_1.timeVietNameYesterday)(),
                        1,
                        code_order_detail,
                        JSON.stringify(item.code_product),
                        -1,
                    ];
                    const dataSQL_2 = [
                        code_order_detail,
                        data.data_user.phone,
                        data.data_user.phone,
                        item.code_payment,
                        item.code_shop,
                        item.total_order,
                        item.quatity,
                        -1,
                        item.info_product
                    ];
                    data_product_result_2.push(dataSQL_2);
                    data_product_result.push(dataSQL);
                });
                const formatSQLCheckout = (0, pg_format_1.default)(`
          INSERT INTO order_sp
	          (code_order, code_user, code_address, date_order, status, code_order_detail, code_product, status_order)
	        VALUES %L 
        `, data_product_result);
                const formatSQLCheckoutDetail = (0, pg_format_1.default)(`
        INSERT INTO order_detail_sp
	              (code_order_detail, phone_order, phone_shipw, code_payment, code_shop, total_order, quatity, progress,info_order)
        VALUES %L 
        `, data_product_result_2);
                console.log(data_product_result_2);
                yield database_1.default.query(formatSQLCheckoutDetail, []);
                database_1.default.query(formatSQLCheckout, [], callback);
            }
        });
    }
}
exports.CheckoutModel = CheckoutModel;
