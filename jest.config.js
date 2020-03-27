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
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  coverageReporters: ['text', 'json', 'html'],
  testURL: 'http://localhost',
  testMatch: [
    '<rootDir>/packages/**/*.test.ts?(x)',
    '<rootDir>/packages/**/__test__/*.ts?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/tools/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'd.ts', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  setupFiles: ['<rootDir>/setupTests.tsx'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -20,
    },
  },
  coveragePathIgnorePatterns,
}
