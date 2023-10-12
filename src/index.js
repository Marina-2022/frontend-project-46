import path from 'path';
import process from 'process';

const getAbsolutePath = (filepath) => {
    const absolutePath = path.resolve(process.cwd(), filepath);
    return absolutePath;
};
