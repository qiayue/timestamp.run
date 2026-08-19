import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Apostrophes and quotes in prose are valid JSX text; escaping them only
      // makes the marketing copy harder to read and edit.
      'react/no-unescaped-entities': 'off',
    },
  },
]

export default config
