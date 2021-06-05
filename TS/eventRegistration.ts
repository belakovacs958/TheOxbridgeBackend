import mongoose from "mongoose";
var Schema = mongoose.Schema;

let EventRegistrationSchema = new Schema({
    eventRegId: Number,
    shipId : Number,
    eventId : Number,
    trackColor : String,
    teamName : String
});

module.exports = mongoose.model('EventRegistration', EventRegistrationSchema);