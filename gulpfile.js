var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var nodemon = require('gulp-nodemon')

gulp.task('nodemon', function(done) {
  var running = false;

  return nodemon({
    script: 'app.js',
    watch: ['apps/views/**/*.html', 'public/**/*.js', 'app.js', 'app/**/*.js', 'config/*.js'],
    // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型
    ignore: ["gulpfile.js", "node_modules/", "public/libs/*.*"],
    // ext: 'js html',扩展文件类型
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
    gulp.watch('app/views/**/*.html').on("change", reload)
    gulp.watch('public/**/*.js').on("change", reload)
    gulp.watch('app/**/*.js').on("change", reload)
    gulp.watch('config/*.js').on("change", reload)
})

gulp.task('set-dev-env', function () {
    return process.env.NODE_ENV = 'development';
})

gulp.task('set-production-env', function () {
    return process.env.NODE_ENV = 'production';
})

gulp.task('default', ['set-production-env', 'server'])
gulp.task('dev', ['set-dev-env', 'server'])

