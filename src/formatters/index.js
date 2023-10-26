import getStylish from './stylish.js';
import getPlain from './plain.js';

const formating = (differenceTree, formatName) => {
  const formaters = {
    stylish: getStylish,
    plain: getPlain,
    json: JSON.stringify,
  };
  return formaters[formatName](differenceTree);
};
export default formating;
