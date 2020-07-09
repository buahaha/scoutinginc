const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tradeSchema = new Schema({
  name: String,
  description: String,
  path_to_image: String
});

const Trade = mongoose.model('Trade', tradeSchema);

exports.Trade = Trade;