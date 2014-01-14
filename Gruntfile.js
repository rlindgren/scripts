'use strict';


var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};


// configurable paths
var appConfig = {
    app: 'app',
    src: 'app/src',
    init: 'app/src/init',
    dist: 'dist'
};



var files = require('./files');
var utils = require('./buildUtils');


// get resolved paths to app src files
// var initFiles = utils.recursiveCollectPaths(appConfig.init);
// var appFiles = utils.recursiveCollectPaths(appConfig.src, null, null, null, appConfig.init); // ignore 'app/src/init'



// # Globbing
// (faster) matching one level down: 'test/spec/{,*/}*.js'
// recursively match all subfolders: 'test/spec/**/*.js'



module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    try {
        appConfig.app = require('./bower.json').appPath || appConfig.app;
    } catch (e) {}

    grunt.initConfig({
        knowify: appConfig,
        watch: {
            coffee: {
                files: ['<%= knowify.app %>/scripts/**/*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/**/*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= knowify.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= knowify.app %>/styles/**/*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= knowify.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= knowify.app %>}/scripts/{,*/}*.js',
                    '<%= knowify.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            jasmine: {
                files: ['{.tmp,<%= knowify.app %>}/scripts/**/*.js', '{.tmp,test}/spec/**/*.js'],
                tasks: ['jasmine:unit']
            }
        },
        autoprefixer: {
            options: ['last 2 versions'],
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, appConfig.app),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, appConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://api.knowify.com:<%= connect.options.port %>'
            },
            firefox: {
                url: 'http://api.knowify.com:<%= connect.options.port %>',
                app: 'firefox'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= knowify.dist %>/*',
                        '!<%= knowify.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= knowify.app %>/scripts/{,*/}*.js'
            ]
        },
        coffee: {
            options: {
                sourceMap: true,
                sourceRoot: ''
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= knowify.app %>/scripts',
                    src: '**/*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= knowify.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= knowify.app %>/images',
                javascriptsDir: '<%= knowify.app %>/scripts',
                fontsDir: '<%= knowify.app %>/styles/fonts',
                importPath: '<%= knowify.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                outputStyle: 'compressed'
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true,
                    outputStyle: 'nested'
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
         dist: {}
         },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= knowify.dist %>/scripts/{,*/}*.js',
                        '<%= knowify.dist %>/styles/{,*/}*.css',
                        '<%= knowify.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= knowify.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= knowify.app %>/index.html',
            options: {
                dest: '<%= knowify.dist %>'
            }
        },
        usemin: {
            html: ['<%= knowify.dist %>/{,*/}*.html'],
            css: ['<%= knowify.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= knowify.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= knowify.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= knowify.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= knowify.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= knowify.dist %>/images'
                }]
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //   files: {
            //     '<%= knowify.dist %>/styles/main.css': [
            //       '.tmp/styles/{,*/}*.css',
            //       '<%= knowify.app %>/styles/{,*/}*.css'
            //     ]
            //   }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/knowify/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= knowify.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= knowify.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= knowify.app %>',
                    dest: '<%= knowify.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'bower_components/**/*',
                        'images/{,*/}*.{gif,webp}',
                        'styles/**/*',
                        'scripts/**/*',
                        'views/**/*','*.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= knowify.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '.tmp/styles',
                dest: '<%= knowify.dist %>/styles/',
                src: '{,*/}*.css'
            }

        },
        concurrent: {
            server: [
                'coffee:dist',
                'compass:server',
                'copy:styles'
            ],
            test: [
                'coffee',
                'compass',
                'copy:styles'
            ],
            dist: [
                'coffee:dist',
                'compass:server',
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        jasmine: {
            unit: {
                src: [
                    // utils.setRelativeTo(initFiles, appConfig.app),
                    // utils.setRelativeTo(appFiles, appConfig.app)
                ],
                options: {
                    specs: ['{.tmp,test}/spec/**/*.js'],
                    vendor: files.js,
                    force: true
                    // helpers: 'spec/*Helper.js'
                }
            }
        },
        cdnify: {
            dist: {
                html: ['<%= knowify.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= knowify.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= knowify.dist %>/scripts'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= knowify.dist %>/scripts/scripts.js': [
                        '<%= knowify.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },
        // ngdocs: {
        //     controllers: {
        //         src: ['app/scripts/controllers/**/*.js'],
        //         title: 'Controllers'
        //     },
        //     directives: {
        //         src: ['app/scripts/directives/**/*.js'],
        //         title: 'Directives'
        //     },
        //     filters: {
        //         src: ['app/scripts/filters/**/*.js'],
        //         title: 'Filters'
        //     },
        //     services: {
        //         src: ['app/scripts/services/**/*.js'],
        //         title: 'Services'
        //     }
        // },
        'regex-replace': {
            dist: { //specify a target with any name
                src: ['dist/scripts/services/Api.js'],
                actions: [
                    {
                        search: '172.16.0.150',
                        replace: grunt.option( "apiUrl" ) || '172.16.0.150' ,
                        flags:''
                    }
                ]
            }
        },
        protractor: {
            options: {
                configFile: "test/e2e/invoice-builder/invoicebuilder.conf.js",
                keepAlive:true,
                noColor:false
            },
            all: {
                configFile: "test/e2e/invoice-builder/invoicebuilder.conf.js",
            }
        }
    });

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-jasmine');


    grunt.registerTask('refresh-app-files-cache', function () {
        // initFiles = utils.recursiveCollectPaths(appConfig.init);
        // appFiles = utils.recursiveCollectPaths(appConfig.src, null, null, null, appConfig.init); // ignore 'app/src/init'
    });

    grunt.registerTask('write-index-server', function () {
        // utils.replaceBlock('app/index.html', null, '<!-- start CSS -->', '<!-- end CSS -->', utils.format('<link rel="stylesheet" href="%s"/>\n', files.css));
        // utils.replaceBlock('app/index.html', null, '<!-- start JS dependencies -->', '<!-- end JS dependencies -->', utils.format('<script type="text/javascript" src="%s"></script>\n', files.js));
        // utils.replaceBlock('app/index.html', null, '<!-- start app init -->', '<!-- end app init -->', utils.format('<script type="text/javascript" src="%s"></script>\n', utils.setRelativeTo(initFiles, appConfig.app)));
        // utils.replaceBlock('app/index.html', null, '<!-- start app -->', '<!-- end app -->', utils.format('<script type="text/javascript" src="%s"></script>\n', utils.setRelativeTo(appFiles, appConfig.app)));
    });

    grunt.registerTask('write-index-dist', function () {

    });


    grunt.registerTask('server', function (target) {

        grunt.task.run(['write-index-server']);

        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'jasmine'
    ]);

    grunt.registerTask('build', [
        // 'bower-install',
        'clean:dist',
        // 'useminPrepare',
        'autoprefixer',
        'compass:server',
        'imagemin',
        'svgmin',
        // 'htmlmin',

        'copy:dist',
        'copy:styles',
        // 'cdnify',
        'ngmin',
        'regex-replace:dist',
        'uglify',
        // 'rev',
        // 'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

};
