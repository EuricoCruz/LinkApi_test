const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const vehicleSchema = new Schema({
  // id:          String,
  vehicle:     String,
  brand:       String,
  year:        String,
  description: String,
  created:     { type: Date, default: Date.now },
  updated:     { type: Date, default: Date.now }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;