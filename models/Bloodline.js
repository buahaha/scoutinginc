const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bloodlineSchema = new Schema({
  charisma: Number,
  corporation_id: Number,
  description: String,
  intelligence: Number,
  memory: Number,
  name: String,
  perception: Number,
  race_id: Number,
  ship_type_id: Number,
  willpower: Number,
  bloodline_id: { type: Number, index: true, unique: true }
});

const Bloodline = mongoose.model('Bloodline', bloodlineSchema);

exports.Bloodline = Bloodline;

    