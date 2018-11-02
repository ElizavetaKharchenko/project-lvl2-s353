import defaultRender from './render_default';
import plainRender from './render_plain';
import jsonRender from './render_json';

const outputFormat = {
  defaultFormat: ast => defaultRender(ast),
  plain: ast => plainRender(ast),
  json: ast => jsonRender(ast),
};

export default (ast, format) => outputFormat[format](ast);
