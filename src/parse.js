import yaml from 'js-yaml';

const parse = (file, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
      return yaml.load(file);
    case '.yml':
      return yaml.load(file);
    default:
      return `Unknown ext ${ext}`;
  }
};

export default parse;
