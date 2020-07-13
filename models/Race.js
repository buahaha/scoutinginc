const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var raceSchema = new Schema({
  faction_id: Number,
  description: String,
  name: String,
  race_id: { type: Number, index: true, unique: true }
});

const Race = mongoose.model('Race', raceSchema);

exports.Race = Race;