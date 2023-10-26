const processingData = (value) => {
  if (typeof value === 'object') {
    return !value ? 'null' : '[complex value]';
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
          return `Property '${depth + diff.name}' was added with value: ${processingData(diff.value)}\n`;
        case 'deleted':
          return `Property '${depth + diff.name}' was removed\n`;
        case 'changed':
          return `Property '${depth + diff.name}' was updated. From ${processingData(diff.value1)} to ${processingData(diff.value2)}\n`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type: ${diff.type}`);
      }
    });
    return `${buildString.join('')}`;
  };
  return iter(differenceTree, '').trim();
};

export default getPlain;
