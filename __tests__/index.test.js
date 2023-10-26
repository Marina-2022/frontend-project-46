import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedPathStylish = getFixturePath('expectedStylish.txt');
const expectedPathPlain = getFixturePath('expectedPlain.txt');
const expectedPathJson = getFixturePath('expectedJson.txt');

const expectedStylish = readFileSync(expectedPathStylish, 'utf-8');
const expectedPlain = readFileSync(expectedPathPlain, 'utf-8');
const expectedJson = readFileSync(expectedPathJson, 'utf-8');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');

const file1Yaml = getFixturePath('file1.yaml');
const file2Yaml = getFixturePath('file2.yaml');

const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

test.each([
  {
    file1: file1Json, file2: file2Json, formatName: 'stylish', expected: expectedStylish,
  },
  {
    file1: file1Json, file2: file2Json, formatName: 'plain', expected: expectedPlain,
  },
  {
    file1: file1Json, file2: file2Json, formatName: 'json', expected: expectedJson,
  },
  {
    file1: file1Yaml, file2: file2Yaml, formatName: 'stylish', expected: expectedStylish,
  },
  {
    file1: file1Yaml, file2: file2Yaml, formatName: 'plain', expected: expectedPlain,
  },
  {
    file1: file1Yaml, file2: file2Yaml, formatName: 'json', expected: expectedJson,
  },
  {
    file1: file1Yml, file2: file2Yml, formatName: 'stylish', expected: expectedStylish,
  },
  {
    file1: file1Yml, file2: file2Yml, formatName: 'plain', expected: expectedPlain,
  },
  {
    file1: file1Yml, file2: file2Yml, formatName: 'json', expected: expectedJson,
  },
  {
    file1: file1Json, file2: file2Json, expected: expectedStylish,
  },
])('genDiff json, stylish, plain', ({
  file1, file2, formatName, expected,
}) => {
  expect(genDiff(file1, file2, formatName)).toEqual(expected);
});

// test('genDiff json default, stylish, plain', () => {
//   const expected = readFileSync(expectedPathStylish, 'utf-8');
//   const expectedPlain = readFileSync(expectedPathPlain, 'utf-8');
//   const expectedJson = readFileSync(expectedPathJson, 'utf-8');

//   const file1 = getFixturePath('file1.json');
//   const file2 = getFixturePath('file2.json');
//   expect(genDiff(file1, file2)).toEqual(expected);
//   expect(genDiff(file1, file2, 'stylish')).toEqual(expected);
//   expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
//   expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
// });

// test('genDiff yaml', () => {
//   const expected = readFileSync(expectedPathStylish, 'utf-8');
//   const expectedPlain = readFileSync(expectedPathPlain, 'utf-8');
//   const expectedJson = readFileSync(expectedPathJson, 'utf-8');

//   const file1 = getFixturePath('file1.yaml');
//   const file2 = getFixturePath('file2.yaml');
//   expect(genDiff(file1, file2)).toEqual(expected);
//   expect(genDiff(file1, file2, 'stylish')).toEqual(expected);
//   expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
//   expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
// });

// test('genDiff yml', () => {
//   const expected = readFileSync(expectedPathStylish, 'utf-8');
//   const expectedPlain = readFileSync(expectedPathPlain, 'utf-8');
//   const expectedJson = readFileSync(expectedPathJson, 'utf-8');

//   const file1 = getFixturePath('file1.yml');
//   const file2 = getFixturePath('file2.yml');
//   expect(genDiff(file1, file2)).toEqual(expected);
//   expect(genDiff(file1, file2, 'stylish')).toEqual(expected);
//   expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
//   expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
// });
