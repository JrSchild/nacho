module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  // https://github.com/facebook/jest/issues/6295#issuecomment-549519867
  testRunner: 'jest-circus/runner',
};
