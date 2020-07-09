const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interestSchema = new Schema({
  name: String,
  description: String,
  path_to_image: String
});

const Interest = mongoose.model('Interest', interestSchema);

exports.Interest = Interest;