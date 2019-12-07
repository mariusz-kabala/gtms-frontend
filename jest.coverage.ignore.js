const PERMANENT_IGNORE = ['/node_modules/', '/dist/', '.d.ts']

const TEMPORARY_IGNORE = [
  './components/common/FlipCard/index.tsx',
  './pages/registration/index.tsx',
  './hooks/auth.ts',
  './pages/index.tsx',
  './api/auth/googleLogin.ts',
  './components/login/SocialButtons/index.tsx',
]

module.exports = [...PERMANENT_IGNORE, ...TEMPORARY_IGNORE]
