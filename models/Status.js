const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
  players: Number,
  server_version: Number,
  start_time: Date,
  vip: Boolean,
});

const Status = mongoose.model('Status', statusSchema);

exports.Status = Status;