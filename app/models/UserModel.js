var mongoose = require('../../config/db')
var UserSchema = require('../schemas/UserSchema')

var UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel