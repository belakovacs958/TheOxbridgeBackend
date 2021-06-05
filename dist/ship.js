"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ShipSchema = new Schema({
    shipId: Number,
    emailUsername: String,
    name: String
});
module.exports = mongoose_1.default.model('Ship', ShipSchema);
