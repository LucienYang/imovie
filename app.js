var express = require('express');
var swig = require('swig');
var path = require('path')
var bodyParser = require('body-parser')
var _ = require('underscore')
var MovieModel = require('./models/MovieModel')

var app = express();
var port = process.env.PORT || 4000

//设置swig页面不缓存
swig.setDefaults({
  cache: false
})
app.set('view cache', false);

app.set('views','./views/pages/');
app.set('view engine','html');
app.engine('html', swig.renderFile)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))
//app.locals的各属性值将贯穿程序的整个生命周期，与其相反的是res.locals，它只在这次请求的生命周期中有效
// app.locals.moment = require('moment')
app.listen(port)

console.log('server is started at http://localhost:'+port);

//index page
app.get('/',function(req, res){
	MovieModel.findAll(function(err, movies){
		res.render('index',{
			title:'imovie 首页 ',
			movies: movies
		})
	})
})


//detail page
app.get('/movie/:id',function(req, res){
	var id = req.params.id
	MovieModel.findById(id,function(err, movie){
		console.log(movie)
		res.render('detail',{
			title:'imovie 详情页面 ',
			movie: movie
		})
	})
})

//list page
app.get('/admin/list',function(req, res){
	MovieModel.findAll(function(err, movies){
		res.render('list',{
			title:'imovie 列表 ',
			movies: movies
		})
	})
})

//admin update movie
app.get('/admin/movie/update/:id', function(req, res){
	var id = req.params.id
	if(id){
		MovieModel.findById(id,function(err, movie){
			console.log(movie)
			res.render('admin',{
				title:'imovie 更新页面 ',
				movie: movie
			})
		})
	}
})

//admin post movie
app.post('/admin/movie',function(req, res){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie

	if(id !== 'undefined'){
		//说明电影已经存在，需要更新
		MovieModel.findById(id, function(err, movie){
			if(err) console.log(err)
			//使用underscore extends方法继承
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if(err) console.log(err)
				res.redirect('/movie/'+movie._id)
			})
		})
	}else{
		//这是一部新电影，我们需要新创建一个MovieModel
		delete movieObj._id
		console.log(movieObj)
		_movie = new MovieModel(movieObj)
		_movie.save(function(err, movie){
			if(err) console.log(err)
			res.redirect('/movie/'+movie._id)
		})
	}
})

//admin page
app.get('/admin/movie',function(req, res){
	res.render('admin',{
		title:'imovie 管理员页面',
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
	});
});

//admin delete item
app.delete('/admin/movie', function(req, res){
	var id = req.body.id
	if(id){
		MovieModel.removeById(id, function(err){
			if(err) console.log(err)
			res.json({success:1})
		})
	}
})
