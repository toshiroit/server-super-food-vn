import jwt from 'jsonwebtoken';
import config from '../../config/config';
import { LoginAuth } from './../../types/schemas/authSchema.type';
const jwtTokens = (userLogin: any) => {
  const accessToken = jwt.sign(userLogin, config.access_token_secret as string, {
    issuer: 'coolIssuer',
    algorithm: 'HS256',
    expiresIn: '10s',
  });
  const refreshToken = jwt.sign(userLogin, config.refresh_token_secret as string, {
    issuer: 'coolIssuer',
    algorithm: 'HS256',
    expiresIn: 60 * 60 * 24,
  });
  return { accessToken, refreshToken };
};
const verifyJWT = (token: string, configTokenVerify: string) => {
  try {
    const decoded = jwt.verify(token, configTokenVerify);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: true };
  }
};
export { jwtTokens, verifyJWT };
