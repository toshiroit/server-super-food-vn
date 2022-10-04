import { LoginAuth } from '../../types/schemas/authSchema.type';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

const signJWT = (user: LoginAuth, callback: (error: Error | null, token: string | null | undefined) => void): void => {
  const timeSinchEpoch = new Date().getTime();
  var expirationTime = timeSinchEpoch + Number(3600) * 100000;
  var expirationTimeSeconds = 60 * 60 * 24;
  try {
    jwt.sign(
      user,
      config.tokenSecret as string,
      {
        issuer: 'coolIssuer',
        algorithm: 'HS256',
        expiresIn: '30s',
      },
      (err, token) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
    callback(error, null);
  }
};
export default signJWT;
