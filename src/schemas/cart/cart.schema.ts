import { object, string } from "zod";

export const removeCartSchema = object({
  body: object({
    code_cart: string({
      required_error: "Không được bỏ trống mã giỏ hàng "
    })
  })
})
