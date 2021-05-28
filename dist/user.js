"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
let UserSchema = new Schema({
    firstname: String,
    lastname: String,
    emailUsername: String,
    password: String,
    role: String
});
module.exports = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map