import yaml from 'js-yaml';

const parse = (file, ext) => {
  const exts = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  return exts[ext](file);
};

export default parse;
