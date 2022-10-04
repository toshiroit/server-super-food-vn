export const getDataObjectValues = (data: object) => {
  let result = '';
  Object.values(data).map(item => {
    if (typeof item === 'boolean') {
      result += `${item}`;
    } else {
      result += `'${item}'`;
    }

    result += ',';
  });
  result = result.substring(0, result.length - 1);
  return result;
};
