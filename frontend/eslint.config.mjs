import react from "eslint-plugin-react";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    ...[
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
    ].map(conf => ({
        ...conf,
        files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
    })),
    {
        plugins: {
            react,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
            }
        }
    },
    {
        rules: {
            semi: 2,
            "no-var": 2,
            "react/jsx-first-prop-new-line": [2, 'multiline'],
        },
    },

];