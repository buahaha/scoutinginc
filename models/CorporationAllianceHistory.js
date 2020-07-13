const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
  history: [{
    alliance_id: Number,
    is_deleted: Boolean,
    record_id: Number,
    start_date: Date,
  }],
  corporation_id: { type: Number, index: true, unique: true }
});

const CorporationAllianceHistory = mongoose.model('CorporationAllianceHistory', historySchema);

exports.CorporationAllianceHistory = CorporationAllianceHistory;