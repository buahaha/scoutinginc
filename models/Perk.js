const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var perkSchema = new Schema({
  name: String,
  description: String,
  path_to_image: String
});

const Perk = mongoose.model('Perk', perkSchema);

exports.Perk = Perk;