import yaml from 'js-yaml';
import ini from 'ini';

const format = {
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const getParsingFormat = exp => format[exp];

export default (ext, data) => {
  const parse = getParsingFormat(ext);
  return parse(data);
};
