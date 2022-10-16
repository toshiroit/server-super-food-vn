import { phoneAuthSendCode } from './../../schemas/auth/auth.schema';
import { TypeOf } from 'zod';
import { loginAuthSchema } from '../../schemas/auth/auth.schema';
import { removeCartSchema } from '../../schemas/cart/cart.schema';

export type LoginAuth = TypeOf<typeof loginAuthSchema>['body'];
export type PhoneSendCodeAuth = TypeOf<typeof phoneAuthSendCode>['body'];
export type RemoveCart = TypeOf<typeof removeCartSchema>['body']
