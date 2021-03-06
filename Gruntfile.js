/*jslint node: true*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jslint: {
            Gruntfile: {
                src: 'Gruntfile.js'
            },
            main: {
                src: 'main.js'
            },
            js: {
                src: 'js/*.js'
            }
        },
        jsonlint: {
            manifests: {
                src: '*.json',
                options: {
                    format: true
                }
            }
        },
        fixpack: {
            package: {
                src: 'package.json'
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-fixpack');
    grunt.registerTask('lint', ['jslint', 'fixpack', 'jsonlint']);
};
