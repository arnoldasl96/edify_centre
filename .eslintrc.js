module.exports = {
  root: true,

  env: {
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'vue/require-prop-types': 'off',
    'vue/no-v-html': 'off',
    'guard-for-in':'off'
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
};
