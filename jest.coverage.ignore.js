const PERMANENT_IGNORE = [
  '/node_modules/',
  '/dist/',
  '.d.ts',
  './i18n.ts',
  './pages/_app.tsx',
  './ui/index.ts',
  './packages/styleguide/src/StyleGuide.tsx',
  './projects/gtms-frontend/packages/ui/Forms/index.ts',
]

const TEMPORARY_IGNORE = [
  './packages/app-andrew/src/pages/group/index.tsx',
  './packages/app-andrew/src/pages/group-create/index.tsx',
  './packages/app-andrew/src/server.ts',
  './packages/app-main/src/components/rules/AcceptRulesButton/index.tsx',
  './packages/app-main/src/pages/rules/index.tsx',
  './packages/app-main/src/providers/Rules/index.tsx',
  './packages/ui/PostSingle/index.tsx',
  './packages/ui/SavedSearch/index.tsx',
  './packages/ui/SearchResults/index.tsx',
  './projects/gtms-frontend/packages/ui/Forms/ExpandingTextarea/index.tsx',
]

module.exports = [...PERMANENT_IGNORE, ...TEMPORARY_IGNORE]
