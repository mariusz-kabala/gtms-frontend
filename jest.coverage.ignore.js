const PERMANENT_IGNORE = ['/node_modules/', '/dist/', '.d.ts']

const TEMPORARY_IGNORE = [
  './components/common/FlipCard/index.tsx',
  './pages/_error.tsx',
  './pages/registration/index.tsx',
]

module.exports = [...PERMANENT_IGNORE, ...TEMPORARY_IGNORE]
