module.exports = function(grunt){

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					/*会启用一个支持重新加载的服务器，这个服务器工作在上述端口号上，
					通过这个服务器可以获取一个脚本，当文件被修改之后，
					通过这个脚本通知前端浏览器自动重新加载内容。*/
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
				// tasks: ['jshint'],
				livereload: true
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**','.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['app', 'config'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			//监控以上两个模块
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	})

	//加载grunt模块
	/*
	Run predefined tasks whenever watched file patterns are added, 
	changed or deleted. 自动刷新，这个应该每个人都用的吧
	*/
	grunt.loadNpmTasks('grunt-contrib-watch')
	//当文件改变的时候 即重启服务器
	grunt.loadNpmTasks('grunt-nodemon')
	//Run grunt tasks concurrently 并发执行任务
	grunt.loadNpmTasks('grunt-concurrent')

	//开发的时候不会因为语法错误或者警告，中断整个服务
	grunt.option('force',true)

	grunt.registerTask('default', ['concurrent'])
}