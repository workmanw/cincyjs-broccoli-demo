var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var pickFiles = require('broccoli-static-compiler');
var concat = require('broccoli-concat');
var filterCoffeeScript = require('broccoli-coffee');
var compileSass = require('broccoli-sass');
var jshintTree = require('broccoli-jshint');
var uglifyJavaScript = require('broccoli-uglify-js');
var env = require('broccoli-env').getEnv()


// Build the vendor tree
var bowerTrees = mergeTrees(findBowerTrees());
var vendorTree = concat(bowerTrees, {
  inputFiles: ['**/*.js'],
  outputFile: '/assets/vendor.js'
});

// Pick out the JS and Coffee files
var appTree = pickFiles('app', {
  srcDir: '/',
  files: ['**/*.js', '**/*.coffee'],
  destDir: '/'
});

// Compile coffee script
appTree = filterCoffeeScript(appTree,  { bare: true });

// If development, js hint the tree
if(env === 'development') {
  var hintedTree = jshintTree(appTree);
}

// Merge all the JS files down
appTree = concat(appTree, {
  inputFiles: ['**/*.js'],
  outputFile: '/assets/app.js',
  wrapInEval: env === 'development'
});

// If production build, uglify the JS
if(env === 'production') {
  appTree = uglifyJavaScript(appTree, { compress: true });
}

// Compile the SASS styles
var stylesTree = compileSass(['app/styles'], 'main.scss', '/assets/app.css');

// Build the final tree
var sourceTrees = ['app/public', appTree, stylesTree, vendorTree];
if(hintedTree) {
  sourceTrees.push(hintedTree);
}
module.exports = mergeTrees(sourceTrees);
