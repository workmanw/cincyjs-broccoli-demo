var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var concat = require('broccoli-concat');
var filterCoffeeScript = require('broccoli-coffee');
var compileSass = require('broccoli-sass');
var jshintTree = require('broccoli-jshint');


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

var jsHintTree = jshintTree(appTree);

appTree = concat(appTree, {
  inputFiles: [ '**/*.js' ],
  outputFile: '/assets/app.js',
  separator: '\n', // (optional, defaults to \n)
  wrapInEval: true // (optional, defaults to false)
});

var styleTree = compileSass(['app/styles'], 'main.scss', '/assets/app.css');

module.exports = mergeTrees(['app/public', jsHintTree, appTree, styleTree, vendorTree]);
