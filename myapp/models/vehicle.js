const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const vehicleSchema = new Schema({
  // id:          String,
  vehicle:     String,
  brand:       String,
  year:        Number,
  description: String,
  created:     { type: Date, default: Date.now },
  updated:     { type: Date, default: Date.now }
});

vehicleSchema.index({'$**': 'text'});
console.log(vehicleSchema._indexes)

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;