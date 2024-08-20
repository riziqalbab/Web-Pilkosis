module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": "off",
    "react-hook/exhaustive-deps": "no",   
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@assets', './src/assets'],
          ['@components', './src/Components'],
          ['@pages', './src/pages'],
          ['@utils', './src/utils'],
          ['@toastifyCss', './node_modules/react-toastify/dist/ReactToastify.css']
        ],
        extensions: ['.ts', '.tsx']
      }
    }
  }
};
