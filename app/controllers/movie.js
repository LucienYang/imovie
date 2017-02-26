const MovieModel = require('../models/MovieModel')
const CommentsModel = require('../models/CommentsModel')
const CategoriesModel = require('../models/CategoriesModel')
const _ = require('underscore')
//detail page

exports.detail = function(req, res){
	var _this = this
	var movieId = req.params.id
	
	MovieModel
	.findOne({_id: movieId})
	.populate('categories', 'name')
	.exec(function(err, movie){
		CommentsModel
		.find({movie: movieId})
		.populate('from', 'username')
		.populate('reply.from', 'username')
		.populate('reply.to', 'username')
		.populate('reply.to', 'username')
		.exec(function(err, comments){
			var totalCount = getTotalCount(comments)
			if(comments && comments.length > 0){
				res.render('detail',{
					title:'imovie 详情页面 ',
					movie: movie,
					comments: comments,
					totalCount: totalCount
				})	
			}else{
				res.render('detail',{
					title:'imovie 详情页面 ',
					movie: movie
				})
			}
		})		
	})

	var getTotalCount = function(comments){
		var count = 0
		for(var i=0;i<comments.length;i++){
			if(comments[i].reply && comments[i].reply.length>0 ){
				count += (comments[i].reply.length+1)
			}else{
				count += 1
			}
		}
		console.log('total count is : '+count)
		return count
	}
	
}




//list page
exports.list = function(req, res){
	MovieModel
	.find({})
	.populate('categories')
	.exec(function(err, movies){
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
			CategoriesModel.find({}).exec(function(err, categories){
				console.log(categories)
				res.render('admin',{
					movie: movie,
					categories: categories
				})
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
		})
	}else{
		//这是一部新电影，我们需要新创建一个MovieModel
		delete movieObj._id
		_movie = new MovieModel(movieObj)
	}

	var categoriesId = movieObj.categories

	CategoriesModel.findOne({_id: categoriesId}).exec(function(err, categories){
		if(err) console.log(err)
		console.log(categories)
		
		_movie.save(function(err, movie){
			if(err) console.log(err)
			categories.movies.push(movie._id)
			categories.save(function(err, categories){
				if(err){
					console.log(err)
					return res.json({success:0, data:err.message})
				}else{
					if(id){
						return res.json({success:2, data:_movie})
					}else{
						return res.json({success:1, data:_movie})
					}
				}
				
			})
		})
	})
}

//admin page
exports.admin = function(req, res){
	CategoriesModel.find({}).exec(function(err, categories){
		console.log(categories)
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
			},
			categories: categories
		})
	})
}

//admin delete item
exports.delete = function(req, res){
	var id = req.body.id
	if(id){
		MovieModel.removeById(id, function(err){
			if(err) console.log(err)
			return res.json({success:1,data:{_id:id}})
		})
	}
}

exports.comments = function(req, res){
	var _comments = req.body.comments
	var _movieId = _comments.movie
	//说明有子评论
	if(_comments.fromId && _comments.toId && _comments.commentId){
		CommentsModel.findById(_comments.commentId, function(err, comment){
			var reply = {
				from: _comments.fromId,
				to: _comments.toId,
				content: _comments.content
			}
			comment.reply.push(reply)
			comment.save(function(err, comments){
				if(err) console.log(err)
				res.redirect("/movie/"+_movieId)
			})
		})
	}else{
		var comments = new CommentsModel(_comments)
		comments.save(function(err, comments){
			if(err) console.log(err)
			res.redirect("/movie/"+_movieId)
		})
	}
}