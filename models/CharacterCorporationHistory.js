const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
  history: [{
    corporation_id: Number,
    is_deleted: Boolean,
    record_id: Number,
    start_date: Date,
  }],
  character_id: { type: Number, index: true, unique: true }
});

const CharacterCorporationHistory = mongoose.model('CharacterCorporationHistory', historySchema);

exports.CharacterCorporationHistory = CharacterCorporationHistory;