/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  /* Where find the tests? */
  testMatch: ["**/**/*.test.ts"],
  /* Report tests */
  verbose: true,
  forceExit: true,
  /* clearMocks: true */

};