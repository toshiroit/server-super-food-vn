import { Request } from 'express';
import { getDataUser } from './getUserToken';

export const dataUserTK = (req: Request) => {
  const data = (req.cookies?.jwt as string) || '';
  const data_user = getDataUser(data, 'jwt');
  return data_user;
};
