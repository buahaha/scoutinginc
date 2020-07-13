const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portraitSchema = new Schema({
  px128x128: String,
  px256x256: String,
  px512x512: String,
  px64x64: String,
  character_id: { type: Number, index: true, unique: true }
});

const CharacterPortrait = mongoose.model('CharacterPortrait', portraitSchema);

exports.CharacterPortrait = CharacterPortrait;