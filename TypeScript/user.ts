import mongoose from "mongoose";
var Schema : any = mongoose.Schema;

let UserSchema = new Schema({
    firstname: String,
    lastname: String,
    emailUsername: String,
    password: String,
    role: String
});
module.exports = mongoose.model('User', UserSchema);