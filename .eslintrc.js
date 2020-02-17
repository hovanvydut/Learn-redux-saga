module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'prettier'
    ],
    plugins: ['prettier'],
    rules: {
        semi: 1,
        quotes: [2, 'single'],
        'react/prop-types': 1,
        'react/jsx-max-props-per-line': 1,
        'linebreak-style': 0,
        'import/no-extraneous-dependencies': 0,
        'class-methods-use-this': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-indent': 0,
        'prettier/prettier': 'error',
        'react/forbid-prop-types': 0,
        'react/require-default-props': 0,
        'react/jsx-indent-props': [2, 4],
        'no-unused-vars': 1,
        'import/order': 1,
        'react/prefer-stateless-function': 0,
        'import/prefer-default-export': 0,
        'prettier/prettier': ['error']
    },
    env: {
        browser: true,
        node: true
    }
};
