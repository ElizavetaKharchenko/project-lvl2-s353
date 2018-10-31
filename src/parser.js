import path from 'path';
import yaml from 'js-yaml';

const format = {
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
};

const getParsingFormat = exp => format[exp];

export default (pathToFile, data) => {
  const expansion = path.extname(pathToFile);
  const parse = getParsingFormat(expansion);
  return parse(data);
};
