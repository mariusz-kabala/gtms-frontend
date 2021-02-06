// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestConfig = require('../../jest.config')

jestConfig.moduleNameMapper = {
  ...jestConfig.moduleNameMapper,
  components: '<rootDir>/src/components',
  enums: '<rootDir>/src/enums',
  helpers: '<rootDir>/src/helpers',
  pages: '<rootDir>/src/pages',
  queries: '<rootDir>/src/queries',
  state: '<rootDir>/src/state',
}

jestConfig.testMatch = [
  '<rootDir>/src/**/*.test.ts?(x)',
  '<rootDir>/src/**/__test__/*.ts?(x)',
]

module.exports = jestConfig
