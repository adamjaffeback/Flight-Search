module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt
  grunt.initConfig({
    // compiles dependencies into one bundle
    browserify: {
      'public/javascripts/bundle.js': [ 'public/javascripts/*.js', '!public/javascripts/bundle.js' ]
    },

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 3000,
          hostname: "localhost",
          bases: ['public'], // Replace with the directory you want the files served from
                              // Make sure you don't use `.` or `..` in the path as Express
                              // is likely to return 403 Forbidden responses if you do
                              // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true,
          server: 'app.js'
        }
      }
    },

    // grunt-watch will monitor the projects files
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: [ 'public/stylesheets/*.css', 'public/index.html', 'public/javascripts/*.js', '!public/javascripts/bundle.js' ],

        options: {
          livereload: true
        },
        tasks: [ 'concat_css', 'browserify' ]
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },

    concat_css: {
      all: {
        src: [ 'node_modules/pikaday/css/pikaday.css', 'public/stylesheets/*.css', '!public/stylesheets/styles.css' ],
        dest: 'public/stylesheets/styles.css'
      }
    }
  });

  grunt.registerTask('default', [
    'browserify',
    'concat_css',
    'express',
    'open',
    'watch'
  ]);

  grunt.registerTask('build', [
    'browserify',
    'concat_css'
  ]);
};