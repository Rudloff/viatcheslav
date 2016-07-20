/*jslint node: true*/
module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-jslint');

    grunt.initConfig({
        jslint: {
            Gruntfile: {
                src: 'Gruntfile.js'
            },
            main: {
                src: 'main.js'
            }
        }
    });

    grunt.registerTask('lint', ['jslint']);
};
