const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var corporationSchema = new Schema({
  alliance_id: Number,
  ceo_id: Number,
  creator_id: Number,
  date_founded: Date,
  description: String,
  faction_id: Number,
  home_station_id: Number,
  member_count: Number,
  name: String,
  shares: Number,
  tax_rate: Number,
  ticker: String,
  url: String,
  war_eligible: Boolean,
  corporation_id: { type: Number, index: true, unique: true }
});

const Corporation = mongoose.model('Corporation', corporationSchema);

exports.Corporation = Corporation;