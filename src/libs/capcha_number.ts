var chars = '0123456789'.split('');
var length = 6;

export const GetCAPTCHACode = (): string => {
  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }
  var str = '';
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};
