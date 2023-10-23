import stylish from './stylish.js';
import getPlain from './plain.js';

const formating = (differenceTree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(differenceTree);
  }
  if (formatName === 'plain') {
    return getPlain(differenceTree);
  }
  return `Unknown format type - ${formatName}`;
};

export default formating;
