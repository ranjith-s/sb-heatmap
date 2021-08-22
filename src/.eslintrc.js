module.exports = {
    "extends": [
      // ...
      "plugin:react-hooks/recommended"
    ],
    plugins: ['react-hooks'],
    parser: "react-scripts/node_modules/babel-eslint",
    rules: {
      // ...
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    },
};  