var mongoose = require('../../config/db')
var MovieSchema = require('../schemas/MovieSchema')

var MovieModel = mongoose.model('Movie', MovieSchema)

module.exports = MovieModel