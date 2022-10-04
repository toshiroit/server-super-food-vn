import { phoneAuthSendCode } from './../../schemas/auth/auth.schema';
import { TypeOf } from 'zod';
import { loginAuthSchema } from '../../schemas/auth/auth.schema';

export type LoginAuth = TypeOf<typeof loginAuthSchema>['body'];
export type PhoneSendCodeAuth = TypeOf<typeof phoneAuthSendCode>['body'];
