import _ from 'lodash';
import { parse } from './parse.js';
import fs from 'fs';
import path from 'path';
import process from 'process';

const getAbsolutePath = (file) => path.resolve(process.cwd(), file);

const getExtName = (file) => path.extname(file);

const readData = (file) => fs.readFileSync(file, 'utf-8');

const getDiffren = (data1, data2) => {
    const objKey1 = Object.keys(data1);
    const objKey2 = Object.keys(data2);
    const unionKeys = _.sortBy(_.union(objKey1, objKey2));
    const keys = unionKeys.map((key) => {
        if (!_.has(data1, key)) {
            return `  + ${key}: ${data2[key]}\n`;
        } if (!_.has(data2, key)) {
            return `  - ${key}: ${data1[key]}\n`;
        }
          if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
            return `    ${key}: ${data1[key]}\n`;
      }
      if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
        return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
        }
    });
    return `{\n${keys.join('')}}`;
};

const gendiff = (file1, file2) => {
    const absolutePath1 = getAbsolutePath(file1);
    const absolutePath2 = getAbsolutePath(file2);

    const data1 = readData(absolutePath1, 'utf-8');
    const data2 = readData(absolutePath2, 'utf-8');
 
    const extname1 = getExtName(file1);
    const extname2 = getExtName(file2);

    const data1Parse = parse(data1, extname1);
    const data2Parse = parse(data2, extname2);
  
    const diffren = getDiffren(data1Parse, data2Parse);

    return diffren;
};

export default gendiff;
