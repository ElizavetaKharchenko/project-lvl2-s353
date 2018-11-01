import _ from 'lodash';// eslint-disable-line

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
  unchanged: (obj, step) => `\n${getIndent(step)}  ${obj.key}: ${stringify(obj.value, step)}`,
  added: (obj, step) => `\n${getIndent(step)}+ ${obj.key}: ${stringify(obj.value, step)}`,
  deleted: (obj, step) => `\n${getIndent(step)}- ${obj.key}: ${stringify(obj.value, step)}`,
  changed: (obj, step) => `\n${getIndent(step)}- ${obj.key}: ${stringify(obj.value_before, step)}\n${getIndent(step)}+ ${obj.key}: ${stringify(obj.value_after, step)}`,
  nested: (obj, step, fn) => `\n${getIndent(step)}  ${obj.key}: ${fn(obj.children, step + 4)}`,
};

const render = (ast, step = 2) => {
  const result = ast.map(node => getString[node.type](node, step, render));
  const resultToFile = `{${result.join('')}\n${getIndent(step - 2)}}\n`;
  return resultToFile;
};

export default render;
