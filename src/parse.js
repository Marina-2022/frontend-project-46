import fs from 'fs';
import path from 'path';
import process from 'process';

const getAbsolutePath = (file) => {
    const absolutePath = path.resolve(process.cwd(), file);
    return absolutePath; 
};

const getExtName = (file) => path.extname(file);

const readData = (file) => fs.readFileSync(file, 'utf-8');

const parse = (file, ext) => {
    if (ext === '.json') {
        return JSON.parse(file);
    }
};

export { parse, getAbsolutePath, readData, getExtName };
