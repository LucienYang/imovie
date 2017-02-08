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
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if (err) return next(err)
		bcrypt.hash(this.password, salt, function(err, hash){
			if (err) return next(err)
			this.password = hash
		})
	})
	//执行next方法后save流程才能继续执行下去
	next()
})

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