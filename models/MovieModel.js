var mongoose = require('../db')
var MovieSchema = require('../schemas/MovieSchema')

var MovieModel = mongoose.model('Movie', MovieSchema)

module.exports = MovieModel