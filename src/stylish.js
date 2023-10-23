import _ from 'lodash';

const getSplitDepth = (depth) => {
  const split = ' ';
  return split.repeat(depth * 4 - 2);
};

const processingData = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKeys = value[key];
    // console.log(key);
    return `${getSplitDepth(depth + 1)}  ${key}: ${processingData(newKeys, depth + 1)}`;
  });
    // console.log(`${result}`);
  return `{\n${result.join('\n')}\n ${getSplitDepth(depth)} }`;
};
  // console.log(processingData(hhh, 1));

const stylish = (differenceTree) => {
  const iter = (node, depth) => {
    // console.log(node);
    const buildString = node.map((diff) => {
      // console.log(diff.type);
      // console.log(diff);
      switch (diff.type) {
        case 'nested': {
          const getChildren = iter(diff.children, depth + 1);
          // console.log(getChildren);
          return `${getSplitDepth(depth)}  ${diff.name}: ${getChildren}\n ${getSplitDepth(depth)} }`;
        }
        case 'added':
          return `${getSplitDepth(depth)}+ ${diff.name}: ${processingData(diff.value, depth)}`;
        case 'deleted':
          return `${getSplitDepth(depth)}- ${diff.name}: ${processingData(diff.value, depth)}`;
        case 'changed':
          return `${getSplitDepth(depth)}- ${diff.name}: ${processingData(diff.value1, depth)}\n${getSplitDepth(depth)}+ ${diff.name}: ${processingData(diff.value2, depth)}`;
        case 'unchanged':
          return `${getSplitDepth(depth)}  ${diff.name}: ${processingData(diff.value, depth)}`;
        default:
          return `Unknown type: ${diff.type}`;
      }
    });
    // const gg = `{\n${buildString.join('\n')}`;
    return `{\n${buildString.join('\n')}`;
  };
  return `${iter(differenceTree, 1)}\n}`;
};

const formating = (differenceTree, format) => {
  if (format === 'stylish') {
    return stylish(differenceTree);
  }
  return `Unknown format type - ${format}`;
};
export default formating;
