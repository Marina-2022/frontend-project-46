
import { parse, getAbsolutePath, readData, getExtName } from './parse.js';


const gendiff = (file1, file2) => {
    const absolutePath1 = getAbsolutePath(file1);
    const absolutePath2 = getAbsolutePath(file2);
    const data1 = readData(absolutePath1);
    const data2 = readData(absolutePath2);
    const extname1 = getExtName(file1);
    const extname2 = getExtName(file2);
    const data1Parse = parse(data1, extname1);
    const data2Parse = parse(data2, extname2);
    return 
};

export default gendiff;
