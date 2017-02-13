const MovieModel = require('../models/MovieModel')
//index page
exports.index = function(req, res){
	MovieModel.findAll(function(err, movies){
		res.render('index',{
			title:'imovie 首页 ',
			movies: movies
		})
	})
}

//index page
exports.adminConsole = function(req, res){
	res.render('adminConsole',{})
}