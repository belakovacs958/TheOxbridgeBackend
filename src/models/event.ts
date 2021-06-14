var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    eventId: Number,
    name: String,
    eventStart: String,
    eventEnd: String,
    city: String,
    eventCode: String,
    actualEventStart : Date,
    isLive : Boolean
});
module.exports = mongoose.model('Event', EventSchema);