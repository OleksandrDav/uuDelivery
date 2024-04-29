const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
   userId: {type: Schema.Types.ObjectId, ref: 'User'},
   destination: {type: String, required: true},
   customerEmail: {type: String, required: true},
   temperatureMax: {type: String, required: true},
   temperatureMin: {type: String, required: true},
   tiltAngleMax: {type: String, required: true},
   trackerId: {type: String},
   start: {type: String},
   end: {type: String},
});

module.exports = model('Order', orderSchema);