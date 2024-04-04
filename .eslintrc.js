module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': ['error', {singleQuote: true}],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-nested-ternary': 0,
    'jsx-bracket-same-line': 0,
  },
};
