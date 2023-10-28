import yaml from 'js-yaml';

const parse = (file, type) => {
  const parsers = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  return parsers[type](file);
};

export default parse;
