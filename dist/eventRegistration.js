"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
let EventRegistrationSchema = new Schema({
    eventRegId: Number,
    shipId: Number,
    eventId: Number,
    trackColor: String,
    teamName: String
});
module.exports = mongoose_1.default.model('EventRegistration', EventRegistrationSchema);
//# sourceMappingURL=eventRegistration.js.map