import z, { preprocess, array, date, number, object, string, TypeOf, ZodType, lazy, union, } from "zod";
import { getProductByCodeAndShop } from "../../../controllers/shop/product/product.controller";
const dateSchema = preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, date());
export type DateSchema = z.infer<typeof dateSchema>;

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
export type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const getProductByCodeAndShopSchema = object({
  query: object({
    code_product: string({
      required_error: 'Mã sản phẩm không được bỏ trống'
    }).max(15, {
      message: 'Mã sản phẩm quá dài'
    })
  })
})
export const addProductShopSchema = object({
  body: object({
    name_product: string({
      required_error: 'Trường này không được bỏ trống'
    }).min(10, {
      message: "Tên sản phẩm phải tối thiệu 10 kí tự "
    }),
    info_product: string({
      required_error: 'Trường này không được bỏ trống'
    }),
    description: string({
      required_error: 'Trường này không được bỏ trống'
    }),
    guide: string({
      required_error: 'Trường này không được bỏ trống'
    }),
    return: string({
      required_error: 'Trường này không được bỏ trống'
    }),
    note: string({
      required_error: 'Trường này không được bỏ trống'
    }),
    image: string({
      required_error: 'Trường này không được bỏ trống'
    }),
    quantity: number({
      required_error: 'Trường này không được bỏ trống'
    }).min(1, {
      message: "Số lượng sản phẩm tối thiệu phải là 1 hoặc lớn hơn"
    }),
    price: number({
      required_error: 'Trường này không được bỏ trống'
    }).min(0, {
      message: "Giá sản phẩm tối thiệu phải lơn hơn hoặc bằng 0"
    }),
    discount: number({
      required_error: 'Trường này không được bỏ trống'
    }).min(0, {
      message: "Giảm giá sản phẩm không được nhỏ hơn 0"
    }).max(100, {
      message: 'Giảm giá sản phẩm chỉ được tối đa 100%'
    }),
    order_max: number({
      required_error: 'Trường này không được bỏ trống'
    }),
    date_start: string(),
    date_end: string(),
    status: number({
      required_error: 'Trường này không được bỏ trống'
    }),
    isShow: number({
      required_error: 'Trường này không được bỏ trống'
    }),
    discount_status: number({
      required_error: 'Trường này không được bỏ trống'
    }),
    free_ship: number({
      required_error: 'Trường này không được bỏ trống'
    }),
    product_date: dateSchema,
    type_product: jsonSchema
  })
})

export type GetProductByCodeAndShop = TypeOf<typeof getProductByCodeAndShopSchema>['query']
export type AddProductShop = TypeOf<typeof addProductShopSchema>['body']
