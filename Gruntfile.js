/*global module:false*/
module.exports = function (grunt) {
  module.require('time-grunt')(grunt);

  grunt.initConfig({

    sync: {
      all: {
        options: {
          sync: ['author', 'name', 'version', 'description', 'homepage', 'license']
        }
      }
    },

    jshint: grunt.file.readJSON('jshint.json'),

    complexity: grunt.file.readJSON('complexity.json'),

    qunit: {
      all: ['index.html']
    },

    'node-qunit': {
      all: {
        deps: './qunit-once.js',
        code: './test/tests.js',
        tests: './test/tests.js'
      }
    },

    'nice-package': {
      all: {}
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['node-qunit', 'qunit']);
  grunt.registerTask('default', ['deps-ok', 'nice-package', 'sync',
    'jshint', 'complexity', 'test']);
};
