import { phoneAuthSendCode } from './../../schemas/auth/auth.schema';
import { TypeOf } from 'zod';
import { loginAuthSchema } from '../../schemas/auth/auth.schema';
import { removeCartSchema } from '../../schemas/cart/cart.schema';
import { getOrderDetailByCodeOrderSchema } from '../../schemas/order/order.schema';

export type LoginAuth = TypeOf<typeof loginAuthSchema>['body'];
export type PhoneSendCodeAuth = TypeOf<typeof phoneAuthSendCode>['body'];
export type RemoveCart = TypeOf<typeof removeCartSchema>['body']
export type GetOrderDetailByCodeOrder = TypeOf<typeof getOrderDetailByCodeOrderSchema>['query']
