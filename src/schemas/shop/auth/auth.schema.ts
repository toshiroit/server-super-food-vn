import { number, object, string, TypeOf } from "zod";
const regexPhoneVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
export const authRegisterShop = object({
  body: object({
    name_shop: string({
      required_error: 'Không được bỏ trống tên shop'
    }).max(150, {
      message: 'Tên chỉ có tối thiệu 150 kí tự '
    }),
    email: string({
      required_error: 'Không được bỏ trống email'
    }).email({
      message: 'Email Không đúng định dạng'
    }),
    name: string({
      required_error: 'Không được để tên trống'
    }).max(150, {
      message: 'Tên chỉ có tối thiệu 150 kí tự '
    }),
    birth_date: string({
      required_error: 'Ngày sinh không được để trống'
    }),
    gender: number({
      required_error: 'Giới tính không được bỏ trống'
    }),
    password: string({
      required_error: 'Mật khẩu không được bỏ trống'
    }),
    phone: string({
      required_error: 'Số điện thoại không được bỏ trống'
    }).regex(regexPhoneVN, {
      message: 'Số điện thoại không đúng định dạng'
    }),
    phone_shop: string({
      required_error: 'Số điện thoại không được bỏ trống'
    }).regex(regexPhoneVN, {
      message: 'Số điện thoại không đúng định dạng'
    }),
    username: string({
      required_error: 'Tên đăng nhập không để trống'
    }).max(200, 'Tên đăng nhập quá dài')
  })
})

export type AuthRegisterShop = TypeOf<typeof authRegisterShop>['body']
