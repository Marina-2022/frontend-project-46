const parse = (file, ext) => {
  if (ext === '.json') {
    return JSON.parse(file);
  }
};

export default parse;
