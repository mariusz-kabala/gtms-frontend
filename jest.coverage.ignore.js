const PERMANENT_IGNORE = ['/node_modules/', '/dist/', '.d.ts']

const TEMPORARY_IGNORE = ['./components/common/FlipCard/index.tsx']

module.exports = [...PERMANENT_IGNORE, ...TEMPORARY_IGNORE]
