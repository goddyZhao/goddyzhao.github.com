module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    uglify: {
      dist: {
        files: {
          'assets/javascripts/application.min.js': [
            'assets/javascripts/application.js'
          ]
        }
      }
    },

    cssmin: {
      app: {
        files: {
          'assets/stylesheets/application.min.css': [
            'assets/stylesheets/bootstrap.css',
            'assets/stylesheets/application.css'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['uglify', 'cssmin']);
};