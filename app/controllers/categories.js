var CategoriesModel = require('../models/CategoriesModel')
const _ = require('underscore')

exports.save = function(req, res){
	var _category = req.body.categories
	var _categoryId =  req.params.categoryId
	
	if(_categoryId){//更新
		CategoriesModel.findById(_categoryId, function(err, category){
			if(err) console.log(err)
			//使用underscore extends方法继承
			var categoryModel = _.extend(category, _category)
			console.log(categoryModel)
			categoryModel.save(function(err, category){
				if(err) console.log(err)
				return res.json({success:2, data:category})
			})
		})
	}else{//新增
		delete _category._id
		var categoryModel = new CategoriesModel(_category)
		categoryModel.save(function(err, category){
			if(err){
				console.log(err)
				return res.json({success:0,data:err.message})
			}
			return res.json({success:1,data:category})
		})
	}
} 

exports.delete = function(req, res){
	var _categoryId = req.params.categoryId
	if(_categoryId){
		CategoriesModel.removeById(_categoryId, function(err){
			if(err){
				console.log(err)
				return res.json({success:0,data:err.message})
			}
			return res.json({success:1,data:{id: _categoryId}})
		})
	}
} 

exports.list = function(req, res){
	CategoriesModel.findAll(function(err, categories){
		if(err){
			console.log(err)
			return res.json({success:0,data:err.message})
		}
		console.log(categories)
		res.render('categoriesList',{
			title:'categories 列表 ',
			categories: categories
		})
	})
} 

exports.findCategoriesAndMovie = function(req, res){
	CategoriesModel
	.find({})
	.populate('movies')
	.exec(function(err, categories){
		if(err){
			console.log(err)
			return res.json({success:0,data:err.message})
		}
		console.log(category)
		res.render('categoriesList',{
			title:'categories 列表 ',
			categories: categories
		})
	})
}  

exports.detail = function(req, res){
	res.render('categoryDetail',{
				title:'categories 列表 '
	})
}

exports.update = function(req, res){
	var _categoryId = req.params.categoryId
	CategoriesModel.findById(_categoryId, function(err, category){
		console.log(category)
		res.render('categoryDetail',{
				title:'categories 列表 ',
				category: category
		})
	})
}  