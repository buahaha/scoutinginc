const mongoose = require('mongoose');
const { Character } = require('./Character');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  name: String,
  date: Date,
  description: String,
  originator: Character,
  winner: Character,
  links: [String]
});

const Event = mongoose.model('Event', eventSchema);

exports.Event = Event;