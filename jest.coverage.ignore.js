const PERMANENT_IGNORE = ['/node_modules/', '/dist/', '.d.ts']

const TEMPORARY_IGNORE = [
  './components/common/FlipCard/index.tsx',
  './pages/registration/index.tsx',
  './pages/login/index.tsx',
  './server.ts',
  './hooks/auth.ts',
  './pages/index.tsx',
]

module.exports = [...PERMANENT_IGNORE, ...TEMPORARY_IGNORE]
