/**
 * This file is required by Jest so that Vue single file components
 * can be transformed into a format that the test runner can understand.
 *
 * Thanks to:
 * https://lmiller1990.github.io/electic/posts/20200320_a_jest_transformer_for_vue_components.html
 * https://medium.com/js-dojo/build-a-jest-transformer-for-vue-js-3-components-982391c1b250
 */

const { parse, compileTemplate } = require('@vue/compiler-sfc');
const { transform } = require('@babel/core');
const babelPreset = require('@babel/preset-env');

module.exports.process = (source, filename) => {
    const parsed = parse(source);
    const template = compileTemplate({
        source: parsed.descriptor.template.content,
    }).code;

    const compiledTemplate = transform(template, {
        presets: [babelPreset],
    }).code;
    const compiledScript = transform(parsed.descriptor.script.content, {
        presets: [babelPreset],
    }).code;

    return (
        compiledTemplate +
        compiledScript +
        '; module.exports = {...module.exports.default, render};'
    );
};
