"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
let LocationRegistrationSchema = new Schema({
    regId: Number,
    eventRegId: Number,
    locationTime: Date,
    longtitude: Number,
    latitude: Number,
    racePointNumber: Number,
    raceScore: Number,
    finishTime: Date,
});
module.exports = mongoose_1.default.model('LocationRegistration', LocationRegistrationSchema);
//# sourceMappingURL=locationRegistration.js.map