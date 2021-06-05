import mongoose from "mongoose";
var Schema = mongoose.Schema;

let racePointSchema = new Schema({
    racePointId: Number,
    type: String, 
    firstLongtitude : Number,
    firstLatitude : Number, 
    secondLongtitude : Number,
    secondLatitude : Number,
    eventId: Number,
    racePointNumber : Number 
    
});
module.exports = mongoose.model('racePoint', racePointSchema);