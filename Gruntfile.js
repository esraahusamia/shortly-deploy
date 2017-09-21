module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
     options: {
      // define a string to insert between files in the concatenated output
      separator: ';'
    },
    dist: {
      // files needs to be concatenated
      src: ['src/**/*.js'],
      // location of the concatenated output JS file
      dest: 'dist/<%= pkg.name %>.js'
    }
  },
//   jshint: {
//   // define the files to lint
//   files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
//   // configure JSHint (documented at http://www.jshint.com/docs/)
//   options: {
//     // more options here if you want to override JSHint defaults
//     globals: {
//       jQuery: true,
//       console: true,
//       module: true
//     }
//   }
// },

mochaTest: {
  test: {
    options: {
      reporter: 'spec'
    },
    src: ['test/**/*.js']
  }
},

nodemon: {
  dev: {
    script: 'server.js'
  }
},

uglify: {
 options: {
      // banner will be inserted at the top of the output which displays the date and time
      banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
    },
    dist: {
      files: {
       'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
     }
   }

 },

 eslint: {
  target: [
        // Add list of files to lint here
        ]
      },

      cssmin: {
      },

      watch: {
        scripts: {
          files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
          ],
          tasks: [
          'concat',
          'uglify'
          ]
        },
        css: {
          files: 'public/*.css',
          tasks: ['cssmin']
        }
      },

      shell: {
        prodServer: {
        }
      },
    });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
    ]);

  grunt.registerTask('build', [
    ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    ]);


};
