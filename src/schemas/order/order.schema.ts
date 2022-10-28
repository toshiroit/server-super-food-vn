import { object, string } from "zod";

export const getOrderDetailByCodeOrderSchema = object({
  query: object({
    code_order: string({
      required_error: "Mã dơn hàng không được bỏ trống "
    })
  })
})
