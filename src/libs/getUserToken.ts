import { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { verifyJWT } from "../utils/jwt/jwt-token";

export const getDataUser = (token: any, bearer: any) => {
  let result = null;
  if (token && bearer === 'jwt') {
    const user = verifyJWT(token, config.refresh_token_secret as string) as JwtPayload;
    delete user.payload.password;
    delete user.payload.verification_code;
    delete user.payload.passwordResetCode;
    result = user;
  }
  return result;
}
