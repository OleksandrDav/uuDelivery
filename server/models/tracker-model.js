const {Schema, model} = require('mongoose');

const trackerSchema = new Schema({
   status: {type: String, required: true, default: 'New'},
   inOrder: {type: Boolean, required: true, default: false},
});

module.exports = model('Tracker', trackerSchema);