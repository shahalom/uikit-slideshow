
module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Metadata
        meta: {
            srcPath: 'src',
            buildPath: 'build'
        },
         copy: {
            // copy component folder to temp folder
            src: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.srcPath %>',
                        src: ['*'],
                        dest: '<%= meta.buildPath %>'
                    }
                ]
            }
        },
       uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy H:MM:ss") %> */\n'
            },
            srcjs: {
                files: {
                    '<%= meta.buildPath %>/bixslideshow.min.js': '<%= meta.srcPath %>/bixslideshow.js'
                }
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Define your tasks here
    // register default task
    grunt.registerTask('default', 'Prepares Bixie Slideshow', function() {

        // execute in order
        grunt.task.run('copy:src');
        grunt.task.run('uglify');
    });

};