import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parse.js';
import formating from './formatters/index.js';

const getAbsolutePath = (file) => path.resolve(process.cwd(), file);

const getExtName = (file) => path.extname(file).slice(1);

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
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key, children: getDiffren(data1[key], data2[key]), type: 'nested',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key, value1: data1[key], value2: data2[key], type: 'changed',
      };
    }
    return { name: key, value: data1[key], type: 'unchanged' };
  });
  return differenceTree;
};

const genDiff = (file1, file2, formatName = 'stylish') => {
  const absolutePath1 = getAbsolutePath(file1);
  const absolutePath2 = getAbsolutePath(file2);

  const data1 = readData(absolutePath1, 'utf-8');
  const data2 = readData(absolutePath2, 'utf-8');

  const extname1 = getExtName(file1);
  const extname2 = getExtName(file2);

  const data1Parse = parse(data1, extname1);
  const data2Parse = parse(data2, extname2);

  const diffrens = getDiffren(data1Parse, data2Parse);

  const result = formating(diffrens, formatName);

  return result;
};

export default genDiff;
