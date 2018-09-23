const utils = require('./utils');

const errMsg = 'Recipe is not valid';

test('rejects nil object', () => {
  expect(() => utils.validateRecipe()).toThrow(errMsg);
});

test('rejects empty object', () => {
  expect(() => utils.validateRecipe({})).toThrow(errMsg);
});

test('rejects object with no ingredietns', () => {
  expect(() => utils.validateRecipe({
    name: 'abc'
  })).toThrow(errMsg);
});

test('rejects object with no name', () => {
  expect(() => utils.validateRecipe({
    ingredients: ['a', 'b'], 
  })).toThrow(errMsg);
});

test('rejects object with empty name', () => {
  expect(() => utils.validateRecipe({
    name: '',
    ingredients: ['a', 'b'],
  })).toThrow(errMsg);
});

test('rejects object with empty ingredients', () => {
  expect(() => utils.validateRecipe({
    name: 'abc',
    ingredients: [], 
  })).toThrow(errMsg);
});

test('does not throw error for valid recipe', () => {
  expect(() => utils.validateRecipe({
    name: 'abc',
    ingredients: ['a', 'b'],
  })).not.toThrow(errMsg);
});
