const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allianceSchema = new Schema({
  creator_corporation_id: Number,
  creator_id: Number,
  date_founded: Date,
  executor_corporation_id: Number,
  name: String,
  ticker: String,
  alliance_id: { type: Number, index: true, unique: true }
});

const Alliance = mongoose.model('Alliance', allianceSchema);

exports.Alliance = Alliance;