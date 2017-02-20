var mongoose = require('../../config/db')
var CommentsSchema = require('../schemas/CommentsSchema')

var CommentsModel = mongoose.model('Comments', CommentsSchema)

module.exports = CommentsModel