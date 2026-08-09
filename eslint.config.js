/**
 * O `no-undef` é o motivo principal deste arquivo existir. Este repositório é
 * JS/JSX por decisão (D-03), sem checagem de tipos — e um identificador
 * referenciado e nunca escrito compila, passa pelo bundler e mata a tela no
 * primeiro render. Foi assim que uma tela do terminal global foi ao ar em
 * branco.
 */
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'

export default [
  { ignores: ['.next/**', 'out/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, 'react-hooks': hooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...hooks.configs.recommended.rules,
      // O JSX transform novo dispensa `import React`.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
]
