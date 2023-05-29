const { Schema, default: mongoose } = require("mongoose");

const userSchema = Schema({
 username: String,
 password: String
})

module.exports = mongoose.model('user', userSchema)