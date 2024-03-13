const {Schema, model} = require('mongoose');

const trackerSchema = new Schema({
   status: {type: String, required: true, default: 'New'},
});

module.exports = model('Tracker', trackerSchema);