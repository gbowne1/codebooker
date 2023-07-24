module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'react-app',
        'react-app/jest',
        'eslint:recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'jsx-quotes': ['error', 'prefer-single'],
        quotes: ['error', 'single'],
        'prettier/prettier': ['error', { singleQuote: true }],
        'react/react-in-jsx-scope': 'off',
    },
};
