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
