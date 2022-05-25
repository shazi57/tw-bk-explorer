module.exports = {
  global: {
    defineProps: 'readonly',
  },
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/require-default-prop': 'off',
  },
};
