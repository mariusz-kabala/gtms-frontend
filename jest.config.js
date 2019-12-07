const coveragePathIgnorePatterns = require('./jest.coverage.ignore.js')

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  testURL: 'http://localhost',
  testMatch: ['<rootDir>/**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/tools/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'd.ts', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|scss|svg|jpg|png)$': 'identity-obj-proxy',
    '^providers/(.*)': '<rootDir>/providers/$1',
    '^api/(.*)': '<rootDir>/api/$1',
    '^helpers/(.*)': '<rootDir>/helpers/$1',
    '^types/(.*)': '<rootDir>/types/$1',
    '^state/(.*)': '<rootDir>/state/$1',
    '^hooks/(.*)': '<rootDir>/hooks/$1',
    '^server/(.*)': '<rootDir>/server/$1',
    '^pages/(.*)': '<rootDir>/pages/$1',
    '^scss/(.*)': '<rootDir>/scss/$1',
    '^components/(.*)': '<rootDir>/components/$1',
    '^i18n$': '<rootDir>/i18n.ts',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  setupFiles: ['<rootDir>/setupTests.tsx'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  coveragePathIgnorePatterns,
}
