
import { parse, getAbsolutePath, readData, getExtName } from './parse.js';
import fs from 'fs';

const gendiff = (file1, file2) => {
    const absolutePath1 = getAbsolutePath(file1);
    const absolutePath2 = getAbsolutePath(file2);
        // console.log(absolutePath2);
    const data1 = readData(absolutePath1, 'utf-8');
    const data2 = readData(absolutePath2, 'utf-8');
    // console.log(data2);
    const extname1 = getExtName(file1);
    const extname2 = getExtName(file2);
    // console.log(extname2);
    const data1Parse = parse(data1, extname1);
    const data2Parse = parse(data2, extname2);
    // console.log(data2Parse, data1Parse);
    return (data2Parse, data1Parse);
};
// gendiff('file1.json', 'file2.json')
// console.log(gendiff('file1.json', 'file2.json'));

export default gendiff;
