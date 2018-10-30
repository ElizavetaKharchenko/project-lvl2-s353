import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('json test', () => {
  const firstArg = path.join(__dirname, '__fixtures__', 'before.json');
  const secondArg = path.join(__dirname, '__fixtures__', 'after.json');
  genDiff(firstArg, secondArg);
  console.log(path.join(__dirname, '../', 'src', '__fixturesFile__', 'genDiffResult'));
  const receivedFilePath = path.join(__dirname, '../', 'src', '__fixturesFile__', 'genDiffResult');
  const expectedFilePath = path.join(__dirname, '__fixtures__', 'diffJson');
  expect(fs.readFileSync(receivedFilePath, 'utf-8')).toBe(fs.readFileSync(expectedFilePath, 'utf-8'));
});
