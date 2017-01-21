var gulp = require('gulp');
var swig = require('gulp-swig')

gulp.task('templates', function() {
  gulp.src('./views/**/*.html')
    .pipe(swig())
    .pipe(gulp.dest('./build/'))
});

gulp.task('default', ['templates']);