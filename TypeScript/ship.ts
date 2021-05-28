import mongoose from "mongoose";
var Schema : any = mongoose.Schema;

let ShipSchema = new Schema({
    shipId: Number,
    emailUsername: String,
    name: String
});
module.exports = mongoose.model('Ship', ShipSchema);