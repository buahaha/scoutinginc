const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ancestrySchema = new Schema({
  bloodline_id: Number,
  description: String,
  icon_id: Number,
  name: String,
  short_description: String,
  ancestry_id: { type: Number, index: true, unique: true }
});

const Ancestry = mongoose.model('Ancestry', ancestrySchema);

exports.Ancestry = Ancestry;