var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user.js')

module.exports = function(app){
	//pre handle login user
	app.use(function(req, res, next){
		app.locals.user = req.session.user
		next()
	})

	//index
	app.get('/',Index.index)
	app.get('/adminConsole',Index.adminConsole)

	//movie
	app.get('/movie/:id', Movie.detail)
	app.get('/admin/movie/list', Movie.list)
	app.get('/admin/movie/update/:id', Movie.update)
	app.post('/admin/movie', Movie.save)
	app.get('/admin/movie', Movie.admin)
	app.delete('/admin/movie', Movie.delete)

	//user
	app.get('/admin/user/list', User.list)
	app.post('/user/register', User.register)
	app.post('/user/login', User.login)
	app.get('/logout', User.logout)
}