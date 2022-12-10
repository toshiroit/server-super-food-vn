export type UserLogin = {
  phone?: number | undefined;
  username?: string | null;
};
export type AuthenticateLogin = {
  phone?: number | undefined;
  username?: string | null;
  password: string | null;
};
export type CheckPhoneAuth = {
  phone?: string | null;
};
export type CheckCodeAuth = {
  code: string;
};

export type AuthLoginAdmin = {
  user_name: string;
  password: string;
};
export type UserDataUpdate = {
  code_shop: string;
  full_name: string;
  email: string;
  date: string;
  phone: string;
  facebook: string;
  youtube: string;
  name_shop: string;
  avatar: string;
  background_shop: string;
  description: string;
};
