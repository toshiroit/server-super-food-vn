import bcrypt from 'bcrypt';
import config from '../config/config';
export const hasPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

export const comparePassword = (password: string, hasPassword: string) => {
  const isPassword = bcrypt.compareSync(`${password}${config.pepper}`, hasPassword);
  return isPassword;
};
