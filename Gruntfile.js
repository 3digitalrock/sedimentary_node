module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        vendorsangular: {
            src:    ['bower_components/ng-file-upload/angular-file-upload-shim.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-moment/angular-moment.min.js',
                    'bower_components/angular-loading-bar/build/loading-bar.min.js',
                    'bower_components/angular-xeditable/dist/js/xeditable.min.js',
                    'bower_components/restangular/dist/restangular.min.js',
                    'bower_components/angular-slick/dist/slick.min.js',
                    'bower_components/ng-file-upload/angular-file-upload.js',
                    'bower_components/checklist-model/checklist-model.js',
                    'bower_components/angular-typeahead/angular-typeahead.min.js',
                    'public/js/vendor/realcrowd/rcSubmit.js',
                    'public/js/vendor/realcrowd/rcForms.js',
                    'public/js/vendor/realcrowd/rcDisabled.js',
                    'public/js/vendor/realcrowd/rcWizard.js'],
            dest:   'public/js/dist/vendors/angular.js',
            nonull: true
        },
        vendorsdashboard: {
            src:    ['bower_components/fast-json-patch/dist/json-patch-duplex.min.js',
                    'public/js/vendor/checklist-model.js',
                    'bower_components/lodash/dist/lodash.min.js'],
            dest:   'public/js/dist/vendors/dashboard.js',
            nonull: true
        },
        vendorsfrontend: {
            src:    ['public/js/foundation.min.js',
                    'bower_components/fittext/jquery.fittext.js',
                    'bower_components/responsive-nav/responsive-nav.min.js',
                    'bower_components/slick-carousel/slick/slick.min.js',
                    'bower_components/smooth-scroll/dist/js/smooth-scroll.min.js',
                    'public/js/vendor/responsiveslides.min.js'],
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
                    'bower_components/videojs-youtube/dist/vjs.youtube.js',
                    'bower_components/videojs-hotkeys/videojs.hotkeys.js',
                    'bower_components/videojs-sharetools/videojs.sharetools.js',
                    'bower_components/videojs-playlists/dist/videojs-playlists.min.js'],
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
                                                'public/js/src/admin/video/VideoTrailersController.js',
                                                'public/js/src/admin/studio/studioModule.js',
                                                'public/js/src/admin/studio/StudioDetailsController.js',
                                                'public/js/src/admin/studio/StudioCreateController.js',
                                                'public/js/src/admin/settings/settingsModule.js',
                                                'public/js/src/admin/settings/SettingsFeaturedController.js',
                                                'public/js/src/admin/mail/mailModule.js',
                                                'public/js/src/admin/mail/MailInboxController.js',
                                                'public/js/src/admin/mail/MailViewController.js',
                                                'public/js/src/admin/mail/MailReplyController.js',
                                                'public/js/src/admin/app.js'],
            }
        },
        frontend: {
            files: {
                'public/js/dist/frontend.js':   ['public/js/src/common/api_client.js',
                                                'public/js/src/front/video/videoModule.js',
                                                'public/js/src/front/contact/contactModule.js',
                                                'public/js/src/front/app.js']
            }
        }
    },
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> js */\n'
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
        angularMomentMap: {
            src: 'bower_components/angular-moment/angular-moment.min.js.map',
            dest: 'public/js/dist/vendors/angular-moment.min.js.map',
            flatten: true,
            filter: 'isFile'
        }
    },
    cssmin: {
        sedimentary_common: {
            options: {
                banner: '/*! <%= pkg.name %> common */',
                keepSpecialComments: 0
            },
            files: {
                'public/css/dist/sedimentary-common.css':   ['public/css/video-js.css',
                                                                'public/css/video-js-resolutions.css',
                                                                'bower_components/videojs-sharetools/videojs.sharetools.css',
                                                                'bower_components/angular-loading-bar/build/loading-bar.min.css']
            }
        },
        sedimentary_front: {
            options: {
                banner: '/*! <%= pkg.name %> front */',
                keepSpecialComments: 0
            },
            files: {
                'public/css/dist/sedimentary-front.css':    ['public/css/imports.css',
                                                                'public/css/foundation.css',
                                                                'bower_components/responsive-nav/responsive-nav.css',
                                                                'public/css/sedimentary.css',
                                                                'public/css/focal-point.min.css']
            }
        },
        sedimentary_dash: {
            options: {
                banner: '/*! <%= pkg.name %> dash */',
                keepSpecialComments: 0
            },
            files: {
                'public/css/dist/sedimentary-dash.css': ['bower_components/angular-xeditable/dist/css/xeditable.css',
                                                            'public/css/dashboard.css',
                                                            'public/css/admin.css']
            }
        }
    },
    assets: {
      options: {
        cdnurl: '//slate.3digitalrockstudios.com/assets/',
        truncateHash: 8,
        manifest: 'temp/manifest.json',
        prepend: '/'
      },
      css: {
        options: {
            rel: 'public/',
        },
        src: 'public/css/dist/**',
        dest: 'temp/assets'
      },
      js: {
        options: {
            rel: 'public/',
        },
        src: 'public/js/dist/**',
        dest: 'temp/assets'
      }
    },
    assetsReplace: {
      // global task options
      options: {
        // don't output debug information
        debug: false,
        // define the location of the manifest file.
        manifest: 'temp/manifest.json',
      },
      // the handlebars target
      handlebars: {
        options: {
          // a regex for lax matching {{asset "%"}} allowing for spaces in between
          // and single quotes.
          keyRegex: '\\\{\\\{[\\\s]*asset[\\\s]+[\\\'\\\"]{1}%[\\\'\\\"]{1}[\\\s]*\\\}\\\}',
          // prepend the slash on every asset query
          prepend: '/'
        },
        src: 'public/layouts/*.handlebars',
        dest: 'public/layouts/release/'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('assetflow');

  grunt.registerTask('build', ['uglify:videojs', 'concat', 'ngAnnotate', 'uglify:dashboard', 'uglify:frontend', 'copy', 'cssmin']);
  grunt.registerTask('dev', ['ngAnnotate', 'uglify:dashboard', 'uglify:frontend', 'cssmin']);

};