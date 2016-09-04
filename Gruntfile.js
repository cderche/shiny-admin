var pipeline = require('./pipeline')

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src:  pipeline.jsFiles,
        dest: '.tmp/public/js/build.js'
      }
    },
    concat_css: {
      dist: {
        src:  pipeline.cssFiles,
        dest: '.tmp/public/css/build.css'
      }
    },
    uglify: {
      dist: {
        src:  '.tmp/public/js/build.js',
        dest: '.tmp/public/js/build.js'
      }
    },
    cssmin: {
      dist: {
        files: {
          src:  '.tmp/public/css/build.css',
          dest: '.tmp/public/css/build.css'
        }
      }
    },
    less: {
      dist: {
        files: {
          'public/css/less.css' : 'public/less/custom.less'
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            src:  'public/images/**/*',
            dest: '.tmp/'
          },
          {
            src:  'public/fonts/**/*',
            dest: '.tmp/'
          },
        ]
      }
    },
    watch: {
      js: {
        files: pipeline.jsFiles,
        tasks: ['concat', 'uglify']
      },
      css: {
        files: pipeline.cssFiles,
        tasks: ['concat_css', 'cssmin']
      },
      less: {
        files: pipeline.lessFiles,
        tasks: ['less', 'concat_css', 'cssmin']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-concat-css')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', [
    'less',
    'concat_css',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'watch'
  ])

}
