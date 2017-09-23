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
      src: ['public/client/*.js'],
      // location of the concatenated output JS file
      dest: 'public/dist/testCon.js'
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

    dist: {
      options:{
        sourceMap:true
    },
      files: {
       'dist/all.min.js': ['public/client/**/*.js']
     }
   }

 },

 eslint: {
  target: [
        // Add list of files to lint here
        ]
      },

      cssmin: {
        combine : {
          files : {
           'public/style.css':['public/style.css']
 
          }
        }
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
 grunt.registerTask('default', [   

    'cssmin', 'concat','uglify'
    ]);
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
