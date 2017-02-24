var mongoose = require('../../config/db')
var CategoriesSchema = require('../schemas/CategoriesSchema')

var CategoriesModel = mongoose.model('Categories', CategoriesSchema)

module.exports = CategoriesModel