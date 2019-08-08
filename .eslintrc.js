module.exports = {
    root: true,
    extends: '@react-native-community',
    "env": {
        "es6": true
    },
    "extends": "standard",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
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
        'semi': ["error", "never"],
        'arrow-parens': ["error", "as-needed"],
        'import/no-unresolved': 'off',
        "no-restricted-globals": ["error", "event", "fdescribe"],
        "no-unused-vars": 'off'
    }
};