import defaultRender from './render_default';
import plainRender from './render_plain';

const outputFormat = {
  defaultFormat: ast => defaultRender(ast),
  plain: ast => plainRender(ast),
};

export default (ast, format) => outputFormat[format](ast);
