import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const fileBefore = fs.readFileSync(pathToFile1, 'utf-8');
  const fileAfter = fs.readFileSync(pathToFile2, 'utf-8');
  const fileToObjBefore = JSON.parse(fileBefore);
  const fileToObjAfter = JSON.parse(fileAfter);
  const keys = _.union(Object.keys(fileToObjBefore), Object.keys(fileToObjAfter));
  const result = keys.reduce((acc, key) => {
    if (_.has(fileToObjBefore, key) && !_.has(fileToObjAfter, key)) {
      return acc.concat(`- ${key}: ${fileToObjBefore[key]}\n`);
    }
    if (fileToObjBefore[key] === fileToObjAfter[key]) {
      return acc.concat(` ${key}: ${fileToObjBefore[key]}\n`);
    }
    if (_.has(fileToObjAfter, key) && !_.has(fileToObjBefore, key)) {
      return acc.concat(`+ ${key}: ${fileToObjAfter[key]}\n`);
    }
    return acc.concat(`- ${key}: ${fileToObjBefore[key]}\n+ ${key}: ${fileToObjAfter[key]}\n`);
  }, '');
  const dataToFile = `{\n ${result}}\n`;
  return dataToFile;
  // return fs.writeFileSync(path.join(__dirname, '__fixturesFile__', 'genDiffResult'), dataToFile);
};

export default genDiff;
