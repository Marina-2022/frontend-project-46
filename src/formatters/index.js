import stylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

const formating = (differenceTree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(differenceTree);
  }
  if (formatName === 'plain') {
    return getPlain(differenceTree);
  }
  if (formatName === 'json') {
    return getJson(differenceTree);
  }
  return `Unknown format type - ${formatName}`;
};

export default formating;
