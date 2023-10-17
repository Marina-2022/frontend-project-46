import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('genDiff', () => {
  const expected = fs.readFileSync('./__fixtures__/expected.txt', 'utf-8');

  const file1 = './__fixtures__/file1.json';
  const file2 = './__fixtures__/file2.json';
  expect(genDiff(file1, file2)).toEqual(expected);
});
