import { TypeOf } from 'zod';
import { updateUserW1Schema } from '../../schemas/user/user.schema';

export type UserUpdateW1Info = TypeOf<typeof updateUserW1Schema>['body'];

export type UserUpdateW1InfoIO = {
  dataUserLogin: any;
};

export type UserUpdateData = {
  code_user: string;
  avatar: string;
  full_name: string;
  date: string;
  sex: boolean;
};
