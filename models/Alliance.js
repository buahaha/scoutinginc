const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allianceSchema = new Schema({

  alliance_id: { type: Number, index: true, unique: true }
});

const Alliance = mongoose.model('Alliance', allianceSchema);

exports.Alliance = Alliance;