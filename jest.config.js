/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};