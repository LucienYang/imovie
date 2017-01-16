var mongoose = require('../db')

var MovieSchema = new mongoose.Schema({
	title: String,
	doctor: String,
	country: String,
	year: Number,
	poster:String,
	language: String,
	flash: String,
	summary: String,
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

MovieSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	//执行next方法后save流程才能继续执行下去
	next()
})

MovieSchema.statics = {
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

module.exports = MovieSchema