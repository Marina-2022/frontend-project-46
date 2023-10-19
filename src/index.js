import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parse.js';

const getAbsolutePath = (file) => path.resolve(process.cwd(), file);

const getExtName = (file) => path.extname(file);

const readData = (file) => fs.readFileSync(file, 'utf-8');

const getDiffren = (data1, data2) => {
  const objKey1 = Object.keys(data1);
  const objKey2 = Object.keys(data2);
  const unionKeys = _.sortBy(_.union(objKey1, objKey2));
  const differenceTree = unionKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { name: key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { name: key, value: data1[key], type: 'deleted' };
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return {
        name: key, value1: data1[key], value2: data2[key], type: 'changed',
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key, value: getDiffren(data1[key], data2[key]), type: 'nested',
      };
    }
    return { name: key, value: data1[key], type: 'unchanged' };
  });
  return differenceTree;
};

const split = '  ';

const formatting = (differenceTree) => {
  const buildString = differenceTree.map((diff) => {
    switch (diff.type) {
      case 'deleted':
        return `${split}- ${diff.name}: ${diff.value}`;
      case 'unchanged':
        return `${split}  ${diff.name}: ${diff.value}`;
      case 'changed':
        return `${split}- ${diff.name}: ${diff.value1}\n${split}+ ${diff.name}: ${diff.value2}`;
      case 'added':
        return `${split}+ ${diff.name}: ${diff.value}`;
      default:
        return `Unknown type: ${diff.type}`;
    }
  });
  return `{\n${buildString.join('\n')}\n}`;
};

const genDiff = (file1, file2) => {
  const absolutePath1 = getAbsolutePath(file1);
  const absolutePath2 = getAbsolutePath(file2);

  const data1 = readData(absolutePath1, 'utf-8');
  const data2 = readData(absolutePath2, 'utf-8');

  const extname1 = getExtName(file1);
  const extname2 = getExtName(file2);

  const data1Parse = parse(data1, extname1);
  const data2Parse = parse(data2, extname2);
                                                    // console.log(data1Parse);
                                                    // console.log(data2Parse);

  const diffrens = getDiffren(data1Parse, data2Parse);
                                                    console.log(diffrens);
  const result = formatting(diffrens);

  return result;
};
genDiff('file1.json', 'file2.json');
// console.log(genDiff('file1.json', 'file2.json'));

export default genDiff;
