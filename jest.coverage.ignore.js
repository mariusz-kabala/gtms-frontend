const PERMANENT_IGNORE = [
  '/node_modules/',
  '/dist/',
  '.d.ts',
  './i18n.ts',
  './pages/_app.tsx',
  './ui/index.ts',
  './packages/styleguide/src/StyleGuide.tsx',
]

const TEMPORARY_IGNORE = [
  './packages/ui/PostSingle/index.tsx',
  './packages/app-andrew/src/pages/group/index.tsx',
  './packages/app-andrew/src/server.ts',
  './packages/ui/SavedSearch/index.tsx',
  './packages/app-main/src/pages/rules/index.tsx',
  './packages/app-main/src/providers/Rules/index.tsx',
  './packages/app-main/src/components/rules/AcceptRulesButton/index.tsx',
]

module.exports = [...PERMANENT_IGNORE, ...TEMPORARY_IGNORE]
