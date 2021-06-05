import mongoose from "mongoose";
var Schema = mongoose.Schema;

let LocationRegistrationSchema = new Schema({
    regId: Number,
    eventRegId: Number,
    locationTime: Date,
    longtitude: Number,
    latitude: Number,
    racePointNumber : Number,
    raceScore : Number,
    finishTime : Date,
});

module.exports = mongoose.model('LocationRegistration', LocationRegistrationSchema);