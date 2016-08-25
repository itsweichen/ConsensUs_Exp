Package.describe({
    summary: 'd3 tip',
    version: '0.0.1',
    name: 'weicliu:d3-tip',
    git: 'https://github.com/Caged/d3-tip.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.use(['d3js:d3'], 'client');

    // add dependency for bootstrap3
    api.addFiles([
        'lib/d3-tip.js',
        ], 'client');
});
