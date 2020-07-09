const mongoose = require('mongoose');
const { Perk } = require('./Perk');
const { Event } = require('./Event');
const { Interest } = require('./Interest')
const { Trade } = require('./Trade')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  perks: [Perk],
  events: [Event],
  interests: [Interest],
  trades: [Trade],
  account_created: Date,
  is_corporation_member: Boolean,
  description: String,
  character_id: { type: Number, index: true, unique: true },
  name: String,
  position: Number,
  points: Number
});

const User = mongoose.model('User', userSchema);

exports.User = User;