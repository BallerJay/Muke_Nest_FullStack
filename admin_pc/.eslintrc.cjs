module.exports = {
  root: true, // 指定了root为true，eslint只检查当前项目目录
  env: {
    // 提供预设的全局变量，避免eslint检查报错，例如window
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks'],
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: '2020', // 指定ECMAScript 语法为最新
    sourceType: 'module', // 指定代码为 ECMAScript 模块
    ecmaFeatures: {
      jsx: true, // 启用jsx
    },
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // React17后不需要在jsx中主动引入react
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 1,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-wrap-multilines': 'warn',
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': ['error', { code: 130 }],
    'arrow-parens': 'off',
    'arrow-body-style': 'warn',
    'import/extensions': [
      'off',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
