const grunt = require('grunt');

module.exports = function (grunt) {
    grunt.initConfig({
        nggettext_extract: {
            pot: {
              options: {
                startDelim: '{{',
                endDelim: '}}'
              },
              files: {
                'www/wiki/data/wikicraft.pot': ['www/wiki/html/*.html', 'www/wiki/html/articles/*.html']
              }
            },
          },
          nggettext_compile: {
            all: {
              files: {
                'www/wiki/js/app/helper/translations.js': ['www/wiki/data/*.po']
              }
            },
          },
    });

    grunt.loadNpmTasks('grunt-angular-gettext');

    grunt.registerTask('default', ['nggettext_extract']);
};