import z, { number, isValid, object, string, TypeOf } from 'zod';
const regexPhoneVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
export const registerAuthSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    phone: string({
      required_error: 'Phone is required',
    }).regex(regexPhoneVN, {
      message: 'Error phone format ',
    }),
    first_name: string({
      required_error: 'First name is required',
    })
      .min(2, 'First name is too short - should be min 2 chars')
      .max(10, 'First name is too short - should be max 35 chars'),
    last_name: string({
      required_error: 'Last name is required',
    })
      .min(2, 'First name is too short - should be min 2 chars')
      .max(35, 'Last name is too short - should be max 35 chars'),
    user_name: string({
      required_error: 'User name is required',
    })
      .max(35, 'User name is too short - should be max 35 chars')
      .trim(),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, 'Password is too short - should be min 6 chars')
      .max(30, 'Password confirmation is too short - should be max 30 chars'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    })
      .min(6, 'Password is too short - should be min 6 chars')
      .max(30, 'Password confirmation is too short - should be max 30 chars'),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Password do not match ',
    path: ['passwordConfirmation'],
  }),
});
export const verifyAuthSchema = object({
  params: object({
    id: string(),
    verificationCode: string({
      required_error: 'VerificationCode is required',
    })
      .min(10, 'Verification Code is too short - should be min 10 chars')
      .trim()
      .max(100, 'Verification Code is too short - should be max 100 chars')
      .trim(),
  }).required(),
});

export const phoneAuthSendCode = object({
  body: object({
    phone: string({
      required_error: 'Phone is required',
    }).max(16, {
      message: 'Phone is too short - should is be max 16 chars',
    }),
  }).refine(item => item.phone.length > 0, {
    message: 'Phone is required',
  }),
});

export const loginAuthPhone = object({
  body: object({
    phone: string({
      required_error: 'Phone login is required',
    })
      .max(16, {
        message: 'Phone is too short - should is be max 16 chars',
      })
      .regex(regexPhoneVN, {
        message: 'Error Phone',
      }),
    password: string({
      required_error: 'Password login is required',
    }).max(300, {
      message: 'Password should bd max ? chars',
    }),
  }),
});
export const loginAuthSchema = object({
  body: object({
    phone: string().optional(),
    password: string().max(150, {
      message: 'Password is required',
    }),
    passwordConfirmation: string().max(150, {
      message: 'Confirmation is required',
    }),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Password do not match ',
    path: ['passwordConfirmation'],
  }),
});
export const checkPhoneAuthSchema = object({
  body: object({
    phone: string({
      required_error: 'Phone is required',
    })
      .max(20, {
        message: 'Phone is too short - should is be max 150 chars',
      })
      .regex(regexPhoneVN, {
        message: 'Phone VN error regex',
      }),
  }),
});
export type RegisterAuth = TypeOf<typeof registerAuthSchema>['body'];
export type VerifyAuth = TypeOf<typeof verifyAuthSchema>['params'];
export type LoginAuth = TypeOf<typeof loginAuthSchema>['body'];
