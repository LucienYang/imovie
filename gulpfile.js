var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var nodemon = require('gulp-nodemon')

gulp.task('nodemon', function(done) {
  var running = false;

  return nodemon({
    script: 'app.js',
    watch: ['views/**/*.html', 'public/**/*.js'],
    // ext: 'js html',
    // env: { 'NODE_ENV': 'development' }
  }).on('start', function() {
    if (!running) {
      done();
      running = true;
    }
  })
	.on('restart', function() {
		setTimeout(function(){
			reload()
		},1000)
	})
})

gulp.task('browserSync', ['nodemon'], function(){
	browserSync.init(null, {
        proxy: 'http://localhost:4000',
        // browser: 'chrome',
        notify: false, //加上这句，浏览器自动刷新的时候就不提示 connected success了
        port: 4001
  })
})

gulp.task('server', ['browserSync'], function() {
    gulp.watch('views/**/*.html').on("change", reload)
    gulp.watch('public/**/*.js').on("change", reload)
})

gulp.task('default', ['server'])

