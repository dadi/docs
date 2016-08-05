module.exports = function (grunt) {
	// Outputs the time taken to run each task
	require('time-grunt')(grunt);

	var jsFiles = [
		'frontend/src/*.js',
		'frontend/src/**/*.js'
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Browserify
		browserify: {
			options: {
		 		browserifyOptions: {
					debug: true
				},
				transform: ['require-globify']
		   },
			dist: {
				files: {
					'public/assets/js/main.js': jsFiles
				}
			}
		},

		// Run specific tasks when the source files change (currently any SCSS, CSS or JS file)
		watch: {
			css: {
				files: ['frontend/sass/**/*.scss'],
				tasks: ['build:css']
			},
			js: {
				files: jsFiles,
				tasks: ['build:js']
			}
		},

		// Cleans the output folders when called
		clean: {
			build: {
				src: ['public/assets/js/*', 'public/assets/css/*']
			}
		},

		// Processes the SASS CSS files, no minification
		sass: {
			dist: {
				options: {
					sourceMap: true
				},
				files: {
					'public/assets/css/main.css': 'frontend/sass/main.scss'
				}
			}
		},

		// Processes CSS files
		postcss: {
			options: {
				map: true,
				processors: [
					require('postcss-import')(),
					require('autoprefixer')({browsers: ['> 1%']})
				]
			},
			dist: {
				files: {
					'public/assets/css/main.min.css': ['public/assets/css/*.css']
				}
			}
		},

		// Minify the JS
		uglify: {
			dist: {
				files: {
					'public/assets/js/main.min.js': ['public/assets/js/main.js']
				}
			}
		},
		
		// Helps to detect errors and potential problems in JS
		jshint: {
			all: [
				'Gruntfile.js', 'frontend/src/*.js'
			]
		},

		// Notifications to OS
		notify: {
			css: {
				options: {
					message: '✅ CSS compliled & minified'
				}
			},
			js: {
				options: {
					message: '✅ JS compliled & minified'
				}
			}
		}
	});

	// Load tasks (see package.json)
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-notify');

	// Register terminal commands
	grunt.registerTask('build', ['clean', 'browserify', 'uglify', 'lint', 'sass', 'postcss']);
	grunt.registerTask('build:css', ['sass', 'postcss', 'notify:css']);
	grunt.registerTask('build:js', ['lint', 'browserify', 'notify:js']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('default', ['build']);
};
