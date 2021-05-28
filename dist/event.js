"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
let EventSchema = new Schema({
    eventId: Number,
    name: String,
    eventStart: Date,
    eventEnd: Date,
    city: String,
    eventCode: String,
    actualEventStart: Date,
    isLive: Boolean
});
module.exports = mongoose_1.default.model('Event', EventSchema);
//# sourceMappingURL=event.js.map