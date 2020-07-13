const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var systemSchema = new Schema({
  constellation_id: String,
  name: String,
  planets: [{
      asteroid_belts: [Number],
      moons: [Number],
      planet_id: Number
    }],
  position: {
    x: Number,
    y: Number,
    z: Number
  },
  security_class: String,
  security_status: Number,
  star_id: Number,
  stargates: [Number],
  stations: [Number],
  system_id: { type: Number, index: true, unique: true }
});

const System = mongoose.model('System', systemSchema);

exports.System = System;