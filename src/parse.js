const parse = (file, ext) => {
  if (ext === '.json') {
    return JSON.parse(file);
  }
  return undefined;
};

export default parse;
