var mongoose = require('../db')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10 //bcrypt默认加盐强度

var UserSchema = new mongoose.Schema({
	username: {
		unique: true,
		type: String
	},
	password: String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

UserSchema.pre('save', function(next){
	var user = this
	if(user.isNew){
		user.meta.createAt = user.meta.updateAt = Date.now()
	}else{
		user.meta.updateAt = Date.now()
	}
	//genSalt是异步回调的，所以next方法必须写在回调函数中，否则可能加密不成功
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if (err) return next(err)
		bcrypt.hash(user.password, salt, function(err, hash){
			if (err) return next(err)
			user.password = hash
			//执行next方法后才能并行调用下一个中间件
			next()
		})
	})
})

//methods声明的是实例方法
UserSchema.methods = {
	checkUserPassword : function(_password, cb){
		bcrypt.compare(_password, this.password, function(err, isMatch) {
    	if(err) cb(err)
    	cb(null, isMatch)
		})
	}
}
//static声明的时模型方法，使用时使用 UserModel.[methodName]调用
UserSchema.statics = {
	findAll : function(cb){
		this.find({})
				.sort('meta.updateAt')
				.exec(cb)
	},
	findById : function(id,cb){
		this.findOne({_id:id})
				.sort('meta.updateAt')
				.exec(cb)
	},
	removeById : function(id,cb){
		this.remove({_id:id})
				.exec(cb)
	}
}

module.exports = UserSchema