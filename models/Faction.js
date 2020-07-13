const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var factionSchema = new Schema({
  corporation_id: Number,
  description: String,
  is_unique: Boolean,
  militia_corporation_id: Number,
  name: String,
  size_factor: Number,
  solar_system_id: Number,
  station_count: Number,
  station_system_count: Number,
  faction_id: { type: Number, index: true, unique: true }
});

const Faction = mongoose.model('Faction', factionSchema);

exports.Faction = Faction;