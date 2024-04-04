const {Schema, model} = require('mongoose');

const iotSchema = new Schema({
   timestamp: {
      type: Date,
      default: Date.now
   },
   temperature: {
      type: Number,
      required: true
   },    
   gps: {
      type: {
         type: String,
         enum: ['Point'],
         required: true
      },
      coordinates: {
         type: [Number],
         required: true
      }
   }
});

iotSchema.index({ timestamp: 1 });

module.exports = model('Iot', iotSchema);