import simpleRender from './renderSimple';
import plainRender from './renderPlain';
import jsonRender from './renderJson';

const outputFormat = {
  defaultFormat: simpleRender,
  plain: plainRender,
  json: jsonRender,
};

export default (ast, format) => outputFormat[format](ast);
