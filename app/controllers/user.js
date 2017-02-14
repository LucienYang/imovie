const UserModel = require('../models/UserModel')
//注册用户
exports.registerPage = function(req, res){
	res.render('register')
}
exports.register = function(req, res){
	var _user = req.body.user
	var user = new UserModel(_user)
	user.save(function(err, user){
		if(err){
			console.log(err)
			res.json({success:0,data:err.message})
		}
		console.log(user)
		res.json({success:1,data:user})
	})
}

//用户登录
exports.loginPage = function(req, res){
	res.render('login')
}
exports.login = function(req, res){
	var user = req.body.user
	var _password = user.password
	UserModel.findOne({username:user.username}, function(err, user){
		if(err){
			console.log(err)
			res.json({success:0,data:err.message})
		}
		//登录校验不成功
		if(!user){
			res.json({success:0,data:'该用户不存在'})
		}
		//如果存在这个用户名,然后校验密码
		user.checkUserPassword(_password, function(err, isMatch){
			if(err){
				console.log(err)
				res.json({success:0,data:err.message})
			}
			if(isMatch){
				req.session.user = user

				res.json({success:1,data:user})
			}else{
				console.log(user.username+'密码错误')
				res.json({success:0,data:'密码错误'})
			}
		})
	})
}

exports.logout = function(req, res){
	delete req.session.user
	// delete app.locals.user
	res.redirect('/')
}

//list page
exports.list = function(req, res){
	UserModel.findAll(function(err, users){
		res.render('userList',{
			title:'user列表 ',
			users: users
		})
	})
}

//user delete item
exports.delete = function(req, res){
	var id = req.body.id
	if(id){
		UserModel.removeById(id, function(err){
			if(err) console.log(err)
			res.json({success:1,data:{_id:id}})
		})
	}
}
