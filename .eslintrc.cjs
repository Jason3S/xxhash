/**
 * @type { import("eslint").Linter.Config }
 */
const config = {
    env: {
        es2023: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:promise/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
    },
    overrides: [
        {
            files: '**/*.ts',
            extends: ['plugin:@typescript-eslint/recommended'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            rules: {
                'no-unused-vars': 0, // off - caught by the compiler
                '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
                'node/no-missing-import': [
                    'off',
                    {
                        tryExtensions: ['.js', '.d.ts', '.ts'],
                    },
                ],
                'node/no-unsupported-features/es-syntax': [
                    'error',
                    {
                        ignores: ['modules'],
                    },
                ],
            },
        },
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.mts'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code

                // use an array of glob patterns
                project: ['packages/*/tsconfig.json', 'integration-tests/tsconfig.json'],
            },
        },
    },
};

module.exports = config;
