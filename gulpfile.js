var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var nodemon = require('gulp-nodemon')

gulp.task('nodemon', function(done) {
  var running = false;

  return nodemon({
    script: 'app.js',
    watch: ['views/**/*.html', 'public/**/*.js', 'app.js', 'schemas/*.js', 'models/*.js'],
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
    gulp.watch('views/**/*.html').on("change", reload)
    gulp.watch('public/**/*.js').on("change", reload)
    gulp.watch('schemas/*.js').on("change", reload)
    gulp.watch('models/*.js').on("change", reload)
})

gulp.task('default', ['server'])

