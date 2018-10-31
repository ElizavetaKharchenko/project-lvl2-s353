import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('flat json test', () => {
  const firstArg = path.join(__dirname, '__fixtures__', 'before.json');
  const secondArg = path.join(__dirname, '__fixtures__', 'after.json');
  // const receivedFilePath = path.join
  // (__dirname, '../', 'src', '__fixturesFile__', 'genDiffResult');
  const expectedFilePath = path.join(__dirname, '__fixtures__', 'diffJson');
  expect(genDiff(firstArg, secondArg)).toBe(fs.readFileSync(expectedFilePath, 'utf-8'));
});

test('flat yaml test', () => {
  const firstArg = path.join(__dirname, '__fixtures__', 'before.yaml');
  const secondArg = path.join(__dirname, '__fixtures__', 'after.yaml');
  // const receivedFilePath = path.join
  // (__dirname, '../', 'src', '__fixturesFile__', 'genDiffResult');
  const expectedFilePath = path.join(__dirname, '__fixtures__', 'diffYaml');
  expect(genDiff(firstArg, secondArg)).toBe(fs.readFileSync(expectedFilePath, 'utf-8'));
});
