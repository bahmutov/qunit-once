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
        tests: [
          './test/tests.js',
          './test/test-one-module.js',
          './test/test-two-modules.js'
        ]
      }
    },

    parallel: {
      test: {
        options: {
          grunt: true
        },
        tasks: ['qunit', 'node-qunit']
      }
    },

    'gh-pages': {
      options: {
        base: '.'
      },
      src: [
        'index.html',
        'README.md',
        'prismjs/prism.css',
        'prismjs/prism.js',
        'qunit-once.js',
        'test/*.js'
      ]
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['parallel:test']);
  grunt.registerTask('default', ['deps-ok', 'nice-package', 'sync',
    'jshint', 'complexity', 'test']);
};
