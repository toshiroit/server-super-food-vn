import { bad_words } from '../json/bad-words/data';

export const checkTextBadWord = (value: string) => {
  let result = false;
  bad_words.vi.map(item => {
    if (item.toLowerCase() === value) {
      return (result = true);
    }
  });
  return result;
};
