module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    rules: {
      'react/prefer-stateless-function': 0,
      'react/jsx-filename-extension': 0,
    },
    "env": {
        "browser": true,
        "node": true
    },
    globals: {
      document: false,
    },
  };