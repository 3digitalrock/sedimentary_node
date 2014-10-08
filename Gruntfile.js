module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        dashboard: {
            src: [  'public/js/src/admin/user/userModule.js',
                    'public/js/src/admin/user/LoginController.js',
                    'public/js/src/admin/video/videoModule.js',
                    'public/js/src/admin/video/VideoListController.js',
                    'public/js/src/admin/video/VideoDetailsController.js',
                    'public/js/src/admin/video/VideoUploadController.js',
                    'public/js/src/admin/video/VideoDeleteController.js',
                    'public/js/src/admin/studio/studioModule.js',
                    'public/js/src/admin/studio/StudioDetailsController.js',
                    'public/js/src/admin/studio/StudioCreateController.js',
                    'public/js/src/admin/app.js'],
            dest:   'public/js/dist/dashboard.js',
            nonull: true,
        },
    },
    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        admin: {
            files: {
                'public/js/dist/dashboard.js': ['public/js/dist/dashboard.js'],
            }
        },
    },
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        dashboard: {
            src: 'public/js/dist/dashboard.js',
            dest: 'public/js/dist/dashboard.min.js',
        },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'ngAnnotate', 'uglify']);
  
  // Dev tasks
  grunt.registerTask('dev', ['concat:admin']);

};