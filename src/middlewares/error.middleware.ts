import { NextFunction, Request, Response } from 'express';
import { Error } from '../interfaces/error.interface';
const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Whoops!! Someting went wrong';
  res.status(status).json({ status, message });
};
export default errorMiddleware;
