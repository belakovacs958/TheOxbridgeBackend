var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BroadcastSchema = new Schema({
    firstname: String,
    lastname: String,
    emailUsername: String,
    password: String,
    role: String
});
module.exports = mongoose.model('Broadcast', BroadcastSchema);