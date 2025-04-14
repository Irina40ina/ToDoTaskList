import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
    plugins: {
      vue,
      prettier, // <-- добавлено
    },
    rules: {
      ...vue.configs['flat/recommended'][0].rules,
      'no-console': 'warn',
      'no-debugger': 'error',
      'vue/html-indent': ['error', 2],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'prettier/prettier': 'error', // <-- запуск prettier как правило
    },
  },
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'prettier/prettier': 'error',
    },
  },
];
