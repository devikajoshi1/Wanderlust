const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  title: String,
  address: String,
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('Map', mapSchema);
