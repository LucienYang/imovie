var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var livereload = require('gulp-livereload');
var swig = require('gulp-swig')
var reload = browserSync.reload;


gulp.task('default', ['serve', 'nodemon'], function () {
});


// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync({
        server: "./build"
    });

    gulp.watch('./views/**/*.html', ['templates'])
    		.on('change', browserSync.reload);
});

gulp.task('templates', function() {
  return gulp.src('./views/**/*.html')
    .pipe(swig({
      defaults: {
        cache: false
      }
    }))
    .pipe(gulp.dest('./build'))
    .on("end", reload);
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	})
	.on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	})
	.on('restart', function () {
      console.log('restarted!')
  })

});

