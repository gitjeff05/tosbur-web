/**
 * To use Vue Testing Library, we the following:
 * 1. A test runner (Jest)
 * 2. Transformers for compiling ES6 modules and Vue single file components:
 *     a.) Transpiler for our js files (bable-jest)
 *     b.) Transpiler for Vue SFC
 *
 * This Jest configuration assures that our tests and Vue components can
 * be written in modern ES6 and use Vue single file components.
 */

const config = {
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.*\\.js$': 'babel-jest',
        '.*\\.(vue)$': './jest-parse-sfc.js',
    },
    testEnvironment: 'jsdom',
};

module.exports = config;
