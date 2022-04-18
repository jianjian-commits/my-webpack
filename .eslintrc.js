module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
  },
  rules: {
    semi: 'error',
    'no-console': 'off',
    'linebreak-style': 'off',
    'eol-last': 'off',
    indent: ['warn', 2],
  },
};
