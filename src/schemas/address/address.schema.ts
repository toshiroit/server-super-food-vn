import { boolean, object, string } from 'zod';
const regexPhoneVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

export const addressSchema = object({
  body: object({
    full_name: string({
      required_error: 'Tên không được bỏ trống',
    }),
    phone: string({
      required_error: 'Số điện thoại không được bỏ trống',
    }).regex(regexPhoneVN, {
      message: 'Số điện thoại không đúng định dạng',
    }),
    status: boolean({
      required_error: 'Không được bỏ trống tình trạng',
    }),
    email: string({
      required_error: 'Email không được bỏ trống',
    }).email({
      message: 'Email phải đúng định dạng ',
    }),
    street: string({
      required_error: 'Không được bỏ trống',
    }),
    district: string({
      required_error: 'Không được bỏ trống',
    }),
    province: string({
      required_error: 'Không được bỏ trống',
    }),
    city: string({
      required_error: 'Không được bỏ trống',
    }),
  }),
});
