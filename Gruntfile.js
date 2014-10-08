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
        vendorsDashboard: {
            src: [  'bower_components/moment/min/moment.min.js',
                    'bower_components/angular-moment/angular-moment.min.js',
                    'bower_components/angular-loading-bar/build/loading-bar.min.js',
                    'bower_components/fast-json-patch/dist/json-patch-duplex.min.js',
                    'bower_components/angular-xeditable/dist/js/xeditable.min.js',
                    'public/js/vendor/checklist-model.js'],
            dest:   'public/js/dist/vendors/dashboard.js',
            nonull: true
        }
    },
    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        dashboard: {
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
    copy: {
        jsonPatchMap: {
            src: 'bower_components/fast-json-patch/dist/json-patch-duplex.min.js.map',
            dest: 'public/js/dist/vendors/json-patch-duplex.min.js.map',
            flatten: true,
            filter: 'isFile'
        },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'ngAnnotate', 'uglify', 'copy']);
  
  grunt.registerTask('dev', ['concat']);

};