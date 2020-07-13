const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var iconsSchema = new Schema({
  px128x128: String,
  px256x256: String,
  px64x64: String,
  alliance_id: { type: Number, index: true, unique: true }
});

const AllianceIcons = mongoose.model('AllianceIcons', iconsSchema);

exports.AllianceIcons = AllianceIcons;