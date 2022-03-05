module.exports = {
  env: {
    browser: true,
    es2021: true,
    'shared-node-browser': true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'import',
    'sonarjs',
    'react',
    '@kyleshevlin',
    'prettier',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'react-app',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/!(setupTests|test/utils|*.spec.*|*.test.*).ts?x'],
      rules: {
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
          },
        ],
      },
    },
    {
      parser: 'babel-eslint',
      files: ['*.js'],
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/dot-notation': 0,
        '@typescript-eslint/no-implied-eval': 0,
        '@typescript-eslint/no-throw-literal': 0,
        '@typescript-eslint/no-var-requires': 0,
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/return-await': 0,
        'global-require': 0,
        'react/require-default-props': 0,
      },
    },
    {
      files: ['src/serviceWorkerRegistration.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'all',
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        printWidth: 80,
      },
    ],

    'tsdoc/syntax': 'warn',

    'no-plusplus': 0,
    'no-param-reassign': [2, { props: false }],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-unneeded-ternary': 'error',
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'no-fallthrough': 0,
    'no-lonely-if': 'error',
    complexity: ['warn', 30],
    'prefer-arrow-callback': ['error'],
    camelcase: [0, { properties: 'never' }],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ],
    'no-underscore-dangle': [1, { allowAfterThis: true }],
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-no-useless-fragment': 0,
    'no-restricted-exports': 0,
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/require-default-props': 0,
    'react/no-unstable-nested-components': 1,
    'react/boolean-prop-naming': 1,
    'react/no-unused-prop-types': 0,
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/jsx-props-no-spreading': 0,

    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/strict-boolean-expressions': [
      2,
      {
        allowNullableBoolean: true,
        allowNullableObject: true,
        allowString: true,
        allowNullableString: true,
        allowNumber: false,
        allowNullableNumber: false,
        allowAny: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowedNames: ['validationSchema'],
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    'sonarjs/cognitive-complexity': 0,
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-collapsible-if': 'warn',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-anonymous-default-export': 0,
    'import/prefer-default-export': 0,
    'import/newline-after-import': 'error',
    'import/no-cycle': 0,
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
