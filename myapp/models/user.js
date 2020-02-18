const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  // id:          String,
  name:        String,
  email:       {type: String, unique: true},
  password:    String,
  token:       String,
  created:     { type: Date, default: Date.now },
  updated:     { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;