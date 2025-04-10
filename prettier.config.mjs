/** @type {import('prettier').Config} */
const prettierConfig = {
    plugins: [],
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    semi: true,
    useTabs: true,
    trailingComma: 'all',
};

const config = {
    ...prettierConfig,
};

export default config;
