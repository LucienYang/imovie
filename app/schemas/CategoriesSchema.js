var mongoose = require('../../config/db')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CategoriesSchema = new Schema({
	name: String,
	movies: {
		type: ObjectId,
		ref: 'Movie'
	},
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

CategoriesSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	//执行next方法后save流程才能继续执行下去
	next()
})

CategoriesSchema.statics = {
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

module.exports = CategoriesSchema