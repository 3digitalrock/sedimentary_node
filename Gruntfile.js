module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        admin: {
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
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: 'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
        },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
  
  // Dev tasks
  grunt.registerTask('dev', ['concat:admin']);

};