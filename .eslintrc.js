module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  overrides: [
    {
      files: ['*.ts', '*.d.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
    },
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}
