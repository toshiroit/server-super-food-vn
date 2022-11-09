import { boolean, object, string, TypeOf } from "zod";

export const hideOrderByShopSchema = object({
  body: object({
    is_show: boolean({
      required_error: 'Không được để trống trường này'
    }),
    code_order: string({
      required_error: 'Không được để trống trường này'
    })
  })
})

export const removeOrderByShopSchema = object({
  query: object({
    code_order: string({
      required_error: 'Không được để trông mã đơn hàng '
    })
  })
})
export type HideOrderByShopTypeZod = TypeOf<typeof hideOrderByShopSchema>['body']
