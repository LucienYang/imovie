const MovieModel = require('../models/MovieModel')
const _ = require('underscore')
//detail page
exports.detail = function(req, res){
	var id = req.params.id
	MovieModel.findById(id,function(err, movie){
		console.log(movie)
		res.render('detail',{
			title:'imovie 详情页面 ',
			movie: movie
		})
	})
}

//list page
exports.list = function(req, res){
	MovieModel.findAll(function(err, movies){
		res.render('movieList',{
			title:'imovie 列表 ',
			movies: movies
		})
	})
}

//admin update movie
exports.update = function(req, res){
	var id = req.params.id
	if(id){
		MovieModel.findById(id,function(err, movie){
			console.log(movie)
			res.render('admin',{
				movie: movie
			})
		})
	}
}

//admin post movie
exports.save = function(req, res){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie
	if(id){
		//说明电影已经存在，需要更新
		MovieModel.findById(id, function(err, movie){
			if(err) console.log(err)
			//使用underscore extends方法继承
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if(err) console.log(err)
				res.json({success:2, data:_movie})
			})
		})
	}else{
		//这是一部新电影，我们需要新创建一个MovieModel
		delete movieObj._id
		console.log(movieObj)
		_movie = new MovieModel(movieObj)
		_movie.save(function(err, movie){
			if(err) console.log(err)
			res.json({success:1, data:_movie})
		})
	}
}

//admin page
exports.admin = function(req, res){
	res.render('admin',{
		movie:{
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster:"",
			language: '',
			flash: '',
			summary:''
		}
	})
}

//admin delete item
exports.delete = function(req, res){
	var id = req.body.id
	if(id){
		MovieModel.removeById(id, function(err){
			if(err) console.log(err)
			res.json({success:1,data:{_id:id}})
		})
	}
}