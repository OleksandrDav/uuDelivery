const { Schema, model } = require('mongoose');

const iotSchema = new Schema(
   {
      metadata: {
         type: Object,
         required: true
      },
      timestamp: {
         type: Date,
         default: Date.now
      },
      data: {
         type: Array,
         required: true
      }
   },
   {
      timeseries: {
         timeField: 'timestamp',
         metaField: 'metadata'
      }
   }
);

module.exports = model('Iot', iotSchema);