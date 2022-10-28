import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config/config';
import { Error } from '../../interfaces/error.interface';
import signJWT from '../../functions/jwt/signJWT';
import { rateLimit } from 'express-rate-limit';
const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error : Please try again');
  error.status = 401;
  return next(error);
};
const handlePermissionDenied = (next: NextFunction) => {
  const error: Error = new Error('permission denied');
  error.status = 403;
  return next(error);
};
export const loginAccountLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction) => {
    res.status(429).json({
      status: 429,
      message: 'Quá nhiều yêu cầu vui long thử lại sau 1 phút',
    });
  },
});
export const sendCodeLimiter = rateLimit({
  windowMs: 15 * 60 * 16.6667,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction) => {
    res.status(429).json({
      status: 429,
      message: 'Quá nhiều yêu cầu vui long thử lại sau 1 phút',
    });
  },
});

export const handleCapChaError = (next: NextFunction) => {
  const error: Error = new Error('capCha Error : Please try again');
  error.status = 401;
  return next(error);
};
export const validateCapChaMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get Header Authorization
    const authHeader = req.get('Authorization');

    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        jwt.verify(token, config.tokenSecret as unknown as string, (err, decoded) => {
          if (err) {
            handleUnauthorizedError(next);
          } else {
            res.locals.jwt = decoded;
            next();
          }
        });
      } else {
        handleUnauthorizedError(next);
      }
    } else {
      handleUnauthorizedError(next);
    }
    // Check authHeader validate
  } catch (error) {
    handleUnauthorizedError(next);
  }
};
export const validateTokenAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('cookie');
    if (authHeader) {
      const bearer = authHeader.split('=')[0].toLowerCase();
      const token = authHeader.split('=')[1];
      if (token && bearer === 'jwt') {
        jwt.verify(token, config.refresh_token_secret as unknown as string, (err, decoded) => {
          if (err) {
            handleUnauthorizedError(next);
          } else {
            if (decoded) {
              res.locals.jwt = decoded;
              const data = decoded as JwtPayload;
              console.log("DATA : ", data)
              if (data.code_role) {
                if (data.code_role === 'ROLE-WIAO-ADMIN') {
                  next();
                } else if (data.code_role === 'ROLE-WIXO-USER') {
                  handlePermissionDenied(next);
                } else {
                  handlePermissionDenied(next);
                }
              } else {
                handlePermissionDenied(next);
              }
            }
            res.locals.jwt = decoded;
            //next();
          }
        });
      } else {
        handleUnauthorizedError(next);
      }
    } else {
      handleUnauthorizedError(next);
    }
  } catch (error) {
    handleUnauthorizedError(next);
  }
};
export const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get Header Authorization
    const authHeader = req.get('cookie');
    if (authHeader) {
      const bearer = authHeader.split('=')[0].toLowerCase();
      const token = authHeader.split('=')[1];
      if (token && bearer === 'jwt') {
        jwt.verify(token, config.refresh_token_secret as unknown as string, (err, decoded) => {
          if (err) {
            handleUnauthorizedError(next);
          } else {
            res.locals.jwt = decoded;
            next();
          }
        });
      } else {
        handleUnauthorizedError(next);
      }
    } else {
      handleUnauthorizedError(next);
    }
    // Check authHeader validate
  } catch (error) {
    handleUnauthorizedError(next);
  }
};
