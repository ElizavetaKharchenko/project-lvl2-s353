import _ from 'lodash';

const isValueComplex = value => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const getString = {
  added: (obj, path) => `Property '${path}' was added with value: ${isValueComplex(obj.value)}`,
  deleted: (obj, path) => `Property '${path}' was removed`,
  changed: (obj, path) => `Property '${path}' was updated. From ${isValueComplex(obj.valueBefore)} to ${isValueComplex(obj.valueAfter)}`,
  nested: (obj, path, fn) => fn(obj.children, `${path}.`),
};

const plainRender = (ast) => {
  const iter = (iterAst, pathToNode) => iterAst.filter(node => node.type !== 'unchanged')
    .map((node) => {
      const newPath = `${pathToNode}${node.key}`;
      return getString[node.type](node, newPath, iter);
    });
  const result = _.flatten(iter(ast, '')).join('\n');
  return `${result}\n`;
};

export default plainRender;
