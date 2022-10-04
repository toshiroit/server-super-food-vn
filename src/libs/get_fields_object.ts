export const getDataObjectFields = (data: object) => {
  let result = '';
  Object.keys(data).map(item => {
    result += item;
    result += ',';
  });
  result = result.substring(0, result.length - 1);
  return result;
};
