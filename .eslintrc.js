module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "array-bracket-spacing": [
            "error",
            "always"
        ],
        "arrow-spacing": [
            "error",
            {
                "after": true,
                "before": true
            }
        ],
        "block-spacing": "warn",
        "brace-style": [
            2,
            "1tbs",
            {
                "allowSingleLine": true
            }
        ],
        "keyword-spacing": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "react/jsx-boolean-value": 2,
        "react/jsx-closing-bracket-location": 2,
        "react/jsx-curly-spacing": 2,
        "react/jsx-pascal-case": [
            2,
            {
                "allowAllCaps": true
            }
        ],
        "react/jsx-tag-spacing": 2,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/jsx-wrap-multilines": 2,
        "react/prefer-es6-class": 2,
        "react/prefer-stateless-function": 2,
        "react/self-closing-comp": 2,
        "react/sort-comp": 2
    }
};