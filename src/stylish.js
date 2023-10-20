// import _ from 'lodash';

const getSplitDepth = (depth) => {
  const split = ' ';
  return split.repeat(depth * 4 - 2);
};

const stylish = (differenceTree) => {
  const iter = (node, depth) => {
    const buildString = node.flatMap((diff) => {
      //  console.log(diff.type);
      switch (diff.type) {
        case 'nested': {
          const getChildren = iter(diff.children, depth + 1);
          // console.log(getChildren);
          return `${getSplitDepth(depth)} ${diff.name}: ${getChildren}`;
        }
        case 'added':
          return `${getSplitDepth(depth)}+ ${diff.name}: ${diff.value}`;
        case 'deleted':
          return `${getSplitDepth(depth)}- ${diff.name}: ${diff.value}`;
        case 'changed':
          return `${getSplitDepth(depth)}- ${diff.name}: ${diff.value1}\n${getSplitDepth(depth)}+ ${diff.name}: ${diff.value2}`;
        case 'unchanged':
          return `${getSplitDepth(depth)}  ${diff.name}: ${diff.value}`;
        default:
          return `Unknown type: ${diff.type}`;
      }
    });
    return `{\n${buildString.join('\n')}\n}`;
  };
  return iter(differenceTree, 1);
};

export default stylish;
