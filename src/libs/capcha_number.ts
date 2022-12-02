const chars = '0123456789'.split('');
let length = 6;

export const GetCAPTCHACode = (): string => {
  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};
