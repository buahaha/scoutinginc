const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allienceCorpsSchema = new Schema({
  corporation_ids: [Number],
  alliance_id: { type: Number, index: true, unique: true }
});

const AllianceCorporations = mongoose.model('AllianceCorporations', allienceCorpsSchema);

exports.AllianceCorporations = AllianceCorporations;