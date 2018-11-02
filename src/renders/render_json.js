
export default (ast) => {
  const result = JSON.stringify(ast, '', 2);
  return `${result}\n`;
};
