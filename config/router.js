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
	app.get('/adminConsole', User.requireLogin, User.requireAdmin,Index.adminConsole)

	//movie
	app.get('/movie/:id', Movie.detail)
	app.get('/admin/movie/list', User.requireLogin, User.requireAdmin, Movie.list)
	app.get('/admin/movie/update/:id', User.requireLogin, User.requireAdmin, Movie.update)
	app.post('/admin/movie', User.requireLogin, User.requireAdmin, Movie.save)
	app.get('/admin/movie', User.requireLogin, User.requireAdmin, Movie.admin)
	app.delete('/admin/movie', User.requireLogin, User.requireAdmin, Movie.delete)
	app.post('/movie/comments', User.requireLogin, Movie.comments)

	//user
	app.get('/admin/user/list', User.requireLogin, User.requireAdmin, User.list)
	app.delete('/admin/user', User.requireLogin, User.requireAdmin, User.delete)
	app.get('/user/registerPage', User.registerPage)
	app.post('/user/register', User.register)
	app.get('/user/loginPage', User.loginPage)
	app.post('/login', User.login)
	app.get('/logout', User.logout)
}