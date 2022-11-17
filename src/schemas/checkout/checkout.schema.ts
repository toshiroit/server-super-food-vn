import { number, object, string, TypeOf } from "zod";

export const checkoutSchema = object({
  body: object({
    code_address: string({
      required_error: 'Không được bỏ trống mã địa chỉ'
    }).max(15, 'Mã chỉ tối đa 15 kí tự'),
    code_product: string({
      required_error: 'Không được bỏ trống sản phẩm đặt'
    }),
    code_payment: string({
      required_error: "Không được bỏ trồng mã loại thanh toán"
    }).max(15, 'Mã chỉchứa tối đa 15 kí tự'),
    quatity: number({
      required_error: 'Số lượng sản phẩm không được bỏ trống'
    }),
    total_order: number({
      required_error: 'Tổng đơn hàng không được bỏ trống'
    })
  })
})

export type CheckoutOrderType = TypeOf<typeof checkoutSchema>['body']
