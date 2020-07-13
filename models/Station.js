const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stationSchema = new Schema({
  max_dockable_ship_volume: Number,
  name: String,
  office_rental_cost: Number,
  owner: Number,
  position: {
    x: Number,
    y: Number,
    z: Number
  },
  race_id: Number,
  reprocessing_efficiency: Number,
  reprocessing_stations_take: Number,
  services: [String],
  station_id: { type: Number, index: true, unique: true },
  system_id: Number,
  type_id: Number
});

const Station = mongoose.model('Station', stationSchema);

exports.Station = Station;