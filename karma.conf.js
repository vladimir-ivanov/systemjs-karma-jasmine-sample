module.exports = function (config) {
    config.set({
        basePath: '',
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jspm'
        ],
        frameworks:  ['jspm', 'jasmine'],
        jspm: {
            serveFiles: ['src/**/*.js'],
            loadFiles: ['test/unit/**/*.js'],
            useBundles: true
        },

        proxies: {
            '/base': '/'
        },
        browserDisconnectTimeout: 10 * 1000,
        browserDisconnectTolerance: 2,
        browserNoActivityTimeout: 2 * 60 * 1000,

        singleRun: true,
        browsers: ['Chrome'],
        systemjs: {
            config: {
                transpiler: 'babel'
            },
            testFileSuffix: '-spec.js',
            config: 'config.js'
        }

    });
};
