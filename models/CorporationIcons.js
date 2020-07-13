const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var iconsSchema = new Schema({
  px128x128: String,
  px256x256: String,
  px64x64: String,
  corporation_id: { type: Number, index: true, unique: true }
});

const CorporationIcons = mongoose.model('CorporationIcons', iconsSchema);

exports.CorporationIcons = CorporationIcons;