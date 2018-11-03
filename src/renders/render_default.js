import _ from 'lodash';

const getIndent = times => ' '.repeat(times);

const stringify = (value, offset) => {
  if (_.isArray(value) || !_.isObject(value)) {
    return value;
  }
  return _.keys(value).reduce((acc, elem) => {
    if (_.isObject(value[elem])) {
      const recursiveStr = `\n${getIndent(offset)}  ${elem}: {${stringify(value[elem], offset + 4)}\n${getIndent(offset - 2)}`;
      return acc.concat(recursiveStr);
    }
    const str = `{\n${getIndent(offset)}  ${elem}: ${value[elem]}\n${getIndent(offset - 2)}}`;
    return acc.concat(str);
  }, []);
};

const getString = {
  unchanged: (obj, step) => `${getIndent(step)}  ${obj.key}: ${stringify(obj.value, step)}`,
  added: (obj, step) => `${getIndent(step)}+ ${obj.key}: ${stringify(obj.value, step)}`,
  deleted: (obj, step) => `${getIndent(step)}- ${obj.key}: ${stringify(obj.value, step)}`,
  changed: (obj, step) => [
    `${getIndent(step)}- ${obj.key}: ${stringify(obj.valueBefore, step)}`,
    `${getIndent(step)}+ ${obj.key}: ${stringify(obj.valueAfter, step)}`],
  nested: (obj, step, fn) => `${getIndent(step)}  ${obj.key}: ${fn(obj.children, step + 4)}`,
};

const defaultRender = (ast, step = 2) => {
  const result = ast.map(node => getString[node.type](node, step, defaultRender));
  const flattenResult = _.flatten(result).join('\n');
  return `{\n${flattenResult}\n${getIndent(step - 2)}}\n`;
};

export default defaultRender;
