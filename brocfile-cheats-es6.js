var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var concat = require('broccoli-concat');
var filterCoffeeScript = require('broccoli-coffee');
var compileES6 = require('broccoli-es6-concatenator');
var pickFiles = require('broccoli-static-compiler');


var vendorTree = concat(mergeTrees(findBowerTrees()), {
  inputFiles: [ '**/*.js' ],
  outputFile: '/assets/vendor.js',
  separator: '\n', // (optional, defaults to \n)
  wrapInEval: true // (optional, defaults to false)
});

var appTree = 'app';

appTree = filterCoffeeScript(appTree, {
  bare: true
});


var es6Loader = pickFiles('vendor-app', { srcDir: '/', destDir: '/'});
appTree = compileES6(mergeTrees([appTree, es6Loader]), {
  loaderFile: 'es6-loader.js',
  ignoredModules: [],
  inputFiles: [ '**/*.js' ],
  legacyFilesToAppend: [],
  wrapInEval: true,
  outputFile: '/assets/app.js'
});


var appAndDependencies = mergeTrees([appTree, vendorTree]);


module.exports = mergeTrees(['app/public', appAndDependencies]);
