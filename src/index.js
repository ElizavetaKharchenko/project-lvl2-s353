import fs from 'fs';
import parse from './parser';
import render from './renderFlat';

const getData = pathToData => fs.readFileSync(pathToData, 'utf-8');

const genDiff = (pathToFile1, pathToFile2) => {
  const fileBefore = getData(pathToFile1);
  const fileAfter = getData(pathToFile2);
  const fileParseBefore = parse(pathToFile1, fileBefore);
  const fileParseAfter = parse(pathToFile2, fileAfter);
  return render(fileParseBefore, fileParseAfter);
};

export default genDiff;
