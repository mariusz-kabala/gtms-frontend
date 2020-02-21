const PERMANENT_IGNORE = [
  '/node_modules/',
  '/dist/',
  '.d.ts',
  './i18n.ts',
  './pages/_app.tsx',
]

const TEMPORARY_IGNORE = ['./ui/PostSingle/index.tsx']

module.exports = [...PERMANENT_IGNORE, ...TEMPORARY_IGNORE]
