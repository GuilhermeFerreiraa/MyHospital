module.exports = {
 parser: '@typescript-eslint/parser',
 extends: [
   'plugin:react/recommended',
   'plugin:@typescript-eslint/recommended',
   'prettier',
   'prettier/@typescript-eslint',
 ],
 plugins: ['@typescript-eslint', 'prettier'],
 parserOptions: {
   ecmaVersion: 2018,
   sourceType: 'module',
   ecmaFeatures: {
     jsx: true,
   },
 },
 rules: {
   'prettier/prettier': 'error',
 },
 settings: {
   react: {
     version: 'detect',
   },
 },
};
