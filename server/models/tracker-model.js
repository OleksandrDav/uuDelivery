const {Schema, model} = require('mongoose');

const trackerSchema = new Schema({
   trackerId: {type: String, required: true},
   status: {type: String, required: true, default: 'New'},
   inOrder: {type: Boolean, required: true, default: false},
});

module.exports = model('Tracker', trackerSchema);