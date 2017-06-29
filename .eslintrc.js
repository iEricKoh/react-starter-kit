module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "prefer-const": ["error", {"destructuring": "all"}],
    "no-const-assign": "error",
    "no-var": "error",
    "func-style": [
      "error", 
      "expression", 
      { "allowArrowFunctions": true }
    ],
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "ignore",
        "asyncArrow": "always"
    }],
    "space-before-blocks": [
      "error", 
      { "functions": "always", "keywords": "always", "classes": "always" }
    ],
    "no-param-reassign": "error",
    "prefer-arrow-callback": "error",
    "arrow-spacing": "error",
    "no-useless-constructor": "error",
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "camelcase": "error",
    "id-length": "error",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};
