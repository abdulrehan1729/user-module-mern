const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const tokenSchema = new Schema({
  email: { type: String, unique: false, required: true },
  verification_token: { type: String, unique: true, required: true },
  verification_token_expires: { type: Date, unique: true, required: true }
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
