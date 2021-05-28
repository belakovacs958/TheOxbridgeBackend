import mongoose from "mongoose";
var Schema : any = mongoose.Schema;

let EventRegistrationSchema = new Schema({
    eventRegId: Number,
    shipId : Number,
    eventId : Number,
    trackColor : String,
    teamName : String
});

module.exports = mongoose.model('EventRegistration', EventRegistrationSchema);