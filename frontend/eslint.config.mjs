import * as path from 'path';
import { fileURLToPath } from 'url';

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslintJs from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier";
import eslintReact from "eslint-plugin-react";
import eslintTs from 'typescript-eslint';


const project = "./tsconfig.json";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory: dirname,
    recommendedConfig: eslintJs.configs.recommended,
});

function legacyPlugin(name, alias = name) {
    const plugin = compat.plugins(name)[0]?.plugins?.[alias];

    if (!plugin) {
        throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
    }

    return fixupPluginRules(plugin);
}

export default eslintTs.config(
    eslintJs.configs.recommended,
    ...eslintTs.configs.recommended,
    ...compat.extends("plugin:import/typescript"),
    eslintConfigPrettier,
    {
        languageOptions: {
            parserOptions: {
                project,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project,
                }
            },
        },
        plugins: {
            react: eslintReact,
            import: legacyPlugin("eslint-plugin-import", "import"),
        },
        ignores: ["node_modules"]
    },
    {
        rules: {
            "semi": 2,
            "no-unmodified-loop-condition": 2,
            "no-unsafe-optional-chaining": 2,
            "no-unused-vars": 2,
            "no-useless-assignment": 2,
            "arrow-body-style": [2, "as-needed"],
            "camelcase": 2,
            "capitalized-comments": 2,
            "complexity": [2, 10],
            "default-case-last": 2,
            "eqeqeq": 2,
            "no-console": 2,
            "no-negated-condition": 2,
            "no-nested-ternary": 2,
            "no-return-assign": 2,
            "no-shadow-restricted-names": 2,
            "no-undef-init": 2,
            "no-underscore-dangle": 2,
            "no-unused-expressions": 2,
            "no-useless-concat": 2,
            "no-var": 2,
            "no-with": 2,
            "prefer-template": 2,
            "prefer-const": 2,
            "react/jsx-first-prop-new-line": [2, 'multiline'],
            "import/order": [2, {
                "groups": ["builtin", "external"],
                "newlines-between": "always",
                "alphabetize": { "order": "asc", "caseInsensitive": true }
            }],
            "import/newline-after-import": [2, { "count": 2, }],
            "prettier/prettier": [
                "error",
                {
                    "trailingComma": 'all',
                }
            ]
        },
    },
);