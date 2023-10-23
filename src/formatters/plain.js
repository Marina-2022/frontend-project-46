import _ from 'lodash';

const processingData = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const getPlain = (differenceTree) => {
  const iter = (node, depth) => {
    const buildString = node.map((diff) => {
      switch (diff.type) {
        case 'nested':
          return iter(diff.children, `${depth}${diff.name}.`);
        case 'added':
          return `Property '${depth + diff.name}' was added with value: ${processingData(diff.value)}`;
        case 'deleted':
          return `Property '${depth + diff.name}' was removed`;
        case 'changed':
          return `Property '${depth + diff.name}' was updated. From ${processingData(diff.value1)} to ${processingData(diff.value2)}`;
        default:
          return null;
      }
    });
    return `${buildString.filter((str) => str !== null).join('\n')}`;
  };
  return iter(differenceTree, '');
};

export default getPlain;
