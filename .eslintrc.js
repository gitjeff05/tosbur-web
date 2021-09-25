// eslint-disable-next-line no-undef
module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
        'plugin:testing-library/vue',
        'plugin:jest/recommended',
    ],
    globals: {
        tosbur: 'readonly',
    },
    plugins: ['testing-library'],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
    },
};
