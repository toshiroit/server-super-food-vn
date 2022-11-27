export const timeVietNameYesterday = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  return localISOTime;
};
