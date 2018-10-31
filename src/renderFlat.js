import _ from 'lodash';

export default (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.reduce((acc, key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return acc.concat(`- ${key}: ${data1[key]}\n`);
    }
    if (data1[key] === data2[key]) {
      return acc.concat(` ${key}: ${data1[key]}\n`);
    }
    if (_.has(data2, key) && !_.has(data1, key)) {
      return acc.concat(`+ ${key}: ${data2[key]}\n`);
    }
    return acc.concat(`- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}\n`);
  }, '');
  const dataToFile = `{\n ${result}}\n`;
  return dataToFile;
};
