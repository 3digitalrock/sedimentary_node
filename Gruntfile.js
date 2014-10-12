module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        vendorsDashboard: {
            src:    ['bower_components/moment/min/moment.min.js',
                    'bower_components/angular-moment/angular-moment.min.js',
                    'bower_components/angular-loading-bar/build/loading-bar.min.js',
                    'bower_components/fast-json-patch/dist/json-patch-duplex.min.js',
                    'bower_components/angular-xeditable/dist/js/xeditable.min.js',
                    'public/js/vendor/checklist-model.js'],
            dest:   'public/js/dist/vendors/dashboard.js',
            nonull: true
        },
        vendorsFrontend: {
            src:    ['public/js/foundation.min.js',
                    'bower_components/fittext/jquery.fittext.js',
                    'bower_components/responsive-nav/responsive-nav.min.js',
                    'public/js/loading-bar.js',
                    'bower_components/slick-carousel/slick/slick.min.js',
                    'bower_components/angular-slick/dist/slick.min.js'],
            dest:   'public/js/dist/vendors/frontend.js',
            nonull: true
        },
        videoplayer: {
            src:    ['public/js/dist/vendor/video.dev.js',
                    'bower_components/videojs-ga/dist/videojs.ga.min.js',
                    'bower_components/videojs-persistvolume/videojs.persistvolume.js',
                    'bower_components/videojs-seek/dist/videojs-seek.min.js',
                    'public/js/video-js-resolutions.js',
                    'bower_components/videojs-vimeo/vjs.vimeo.js',
                    'bower_components/videojs-youtube/dist/vjs.youtube.js'],
            dest:   'public/js/dist/videoplayer.js',
            nonull: true
        }
    },
    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        dashboard: {
            files: {
                'public/js/dist/dashboard.js': ['public/js/src/admin/user/userModule.js',
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
            }
        },
        frontend: {
            files: {
                'public/js/dist/frontend.js':   ['public/js/src/common/api_client.js',
                                                'public/js/src/front/video/videoModule.js',
                                                'public/js/src/front/app.js']
            }
        }
    },
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        dashboard: {
            src: 'public/js/dist/dashboard.js',
            dest: 'public/js/dist/dashboard.min.js',
        },
        frontend: {
            src: 'public/js/dist/frontend.js',
            dest: 'public/js/dist/frontend.min.js',
        },
        videojs:  {
            src: 'public/js/vendor/video.dev.js',
            dest: 'public/js/dist/vendor/video.dev.js'
        }
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
  grunt.registerTask('default', ['uglify:videojs', 'concat', 'ngAnnotate', 'uglify:dashboard', 'uglify:frontend', 'copy']);
  
  grunt.registerTask('dev', ['ngAnnotate']);

};