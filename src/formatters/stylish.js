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
    return `${getSplitDepth(depth + 1)}  ${key}: ${processingData(newKeys, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n ${getSplitDepth(depth)} }`;
};

const stylish = (differenceTree) => {
  const iter = (node, depth) => {
    const buildString = node.map((diff) => {
      switch (diff.type) {
        case 'nested': {
          const getChildren = iter(diff.children, depth + 1);
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
    return `{\n${buildString.join('\n')}`;
  };
  return `${iter(differenceTree, 1)}\n}`;
};

export default stylish;
