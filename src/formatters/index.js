import getStylish from './stylish.js';
import getPlain from './plain.js';
// import getJson from './json.js';

const formating = (differenceTree, formatName) => {
  const formaters = {
    stylish: getStylish,
    plain: getPlain,
    json: JSON.stringify,
  };
  return formaters[formatName](differenceTree);
};
export default formating;

//  if (formatName === 'stylish') {
//     return stylish(differenceTree);
//   }
//   if (formatName === 'plain') {
//     return getPlain(differenceTree);
//   }
//   if (formatName === 'json') {
//     return JSON.stringify(differenceTree);
//   }
//   return `Unknown format type - ${formatName}`;
