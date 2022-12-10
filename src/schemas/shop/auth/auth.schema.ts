import { number, object, string, TypeOf } from 'zod';
const regexPhoneVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
export const authVerificationCode = object({
  body: object({
    username: string({
      required_error: 'Không được bỏ trống tài khoản của bạn',
    }),
  }),
});

export const authUpdateUserByShopSchema = object({
  body: object({
    full_name: string({
      required_error: 'Không được bổ trống trường này',
    }).max(150, 'Chỉ chưa tối đa 150 kí tự'),
    email: string({
      required_error: 'Không được bỏ trống trường này',
    }).email('Email không đúng định dạng'),
    date: string({
      required_error: 'Không được bỏ trống trường này',
    }),
    phone: string({
      required_error: 'Không được bỏ trống trường này',
    }).regex(regexPhoneVN, {
      message: 'Không được bỏ trống trường này',
    }),
    name_shop: string({
      required_error: 'Không được bỏ trống trường này',
    }).max(100, {
      message: 'Tên Shop quá dài',
    }),
    avatar: string({
      required_error: 'Hình ảnh không được bỏ trống',
    }),
  }),
});

export const authRegisterShop = object({
  body: object({
    name_shop: string({
      required_error: 'Không được bỏ trống tên shop',
    }).max(150, {
      message: 'Tên chỉ có tối thiệu 150 kí tự ',
    }),
    email: string({
      required_error: 'Không được bỏ trống email',
    }).email({
      message: 'Email Không đúng định dạng',
    }),
    full_name: string({
      required_error: 'Không được để tên trống',
    }).max(150, {
      message: 'Tên chỉ có tối thiệu 150 kí tự ',
    }),
    birth_date: string({
      required_error: 'Ngày sinh không được để trống',
    }),
    gender: number({
      required_error: 'Giới tính không được bỏ trống',
    }),
    password: string({
      required_error: 'Mật khẩu không được bỏ trống',
    }),
    phone: string({
      required_error: 'Số điện thoại không được bỏ trống',
    }).regex(regexPhoneVN, {
      message: 'Số điện thoại không đúng định dạng',
    }),
    phone_shop: string({
      required_error: 'Số điện thoại không được bỏ trống',
    }).regex(regexPhoneVN, {
      message: 'Số điện thoại không đúng định dạng',
    }),
    username: string({
      required_error: 'Tên đăng nhập không để trống',
    }).max(200, 'Tên đăng nhập quá dài'),
    detail_address: string(),
    avatar: string(),
    street: string({
      required_error: 'Không được bỏ trống trường này',
    }),
    village: string({
      required_error: 'Không được bỏ trống trường này',
    }),
    district: string({
      required_error: 'Không được bỏ trống trường này',
    }),
    city: string({
      required_error: 'Không được bỏ trống trường này',
    }),
    type_login: number({
      required_error: 'Không được bỏ trống trường này',
    }),
    description: string({
      required_error: 'Thông tin cửa hàng không được bỏ trống',
    }).max(500, {
      message: 'Tối đa chỉ được 500 kí tự',
    }),
  }),
});

export type AuthRegisterShop = TypeOf<typeof authRegisterShop>['body'];
