export const timeVietNameYesterday = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  return localISOTime;
};

export const timeVietNameFullTime = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const m = new Date(Date.now() - tzoffset);
  m.getUTCFullYear() +
    '/' +
    ('0' + (m.getUTCMonth() + 1)).slice(-2) +
    '/' +
    ('0' + m.getUTCDate()).slice(-2) +
    ' ' +
    ('0' + m.getUTCHours()).slice(-2) +
    ':' +
    ('0' + m.getUTCMinutes()).slice(-2) +
    ':' +
    ('0' + m.getUTCSeconds()).slice(-2);
  return m.toISOString().slice(0, -1);
};
export const endtenMinute = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60300; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  return localISOTime;
};
