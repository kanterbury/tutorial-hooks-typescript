module.exports = {
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "tsconfig.json",
      sourceType: "module",
    },
    plugins: [
      "@typescript-eslint",
      "react",
      "react-hooks",
      "jsx-a11y",
      "jest",
      "prettier",
    ],
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:jest/recommended",
      "plugin:jsx-a11y/recommended",
      // "react-app",
      "prettier",
      "prettier/react",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended",
    ],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "prettier/prettier": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
    },
  };