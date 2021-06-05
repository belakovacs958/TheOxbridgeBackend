"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var racePointSchema = new Schema({
    racePointId: Number,
    type: String,
    firstLongtitude: Number,
    firstLatitude: Number,
    secondLongtitude: Number,
    secondLatitude: Number,
    eventId: Number,
    racePointNumber: Number
});
module.exports = mongoose_1.default.model('racePoint', racePointSchema);
