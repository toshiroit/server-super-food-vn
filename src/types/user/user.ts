import { TypeOf } from "zod";
import { updateUserW1Schema } from "../../schemas/user/user.schema";

export type UserUpdateW1Info = TypeOf<typeof updateUserW1Schema>['body']

export type UserUpdateW1InfoIO = {
  dataUserLogin: any;
}
