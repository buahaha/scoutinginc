const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var characterSchema = new Schema({
  ancestry_id: Number,
  birthday: Date,
  bloodline_id: Number,
  corporation_id: Number,
  description: String,
  gender: String,
  name: String,
  race_id: Number,
  security_status: Number,
  character_id: { type: Number, index: { unique: true } }
});

const Character = mongoose.model('Character', characterSchema);

exports.Character = Character;