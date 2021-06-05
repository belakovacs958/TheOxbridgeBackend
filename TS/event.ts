import mongoose from "mongoose";
var Schema  = mongoose.Schema;

let EventSchema : any = new Schema({
    eventId: Number,
    name: String, 
    eventStart: Date,
    eventEnd: Date,
    city: String,
    eventCode: String,
    actualEventStart : Date,
    isLive : Boolean
});
module.exports = mongoose.model('Event', EventSchema);