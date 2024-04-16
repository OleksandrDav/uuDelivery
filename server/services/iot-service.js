const iotModel = require('../models/iot-model');
const ApiError = require('../errors/api-error');
const { LPPDecoder } = require('lpp-node');

class IotService {
   async createIotData(iotData) {
      
      let decodedData = {}
      const lpp = new LPPDecoder();
      const payload = Buffer.from(iotData.data, 'base64');
      decodedData = lpp.decode(payload);

      const iot = await iotModel.create({
         metadata: iotData.deviceInfo,
         timestamp: iotData.time,
         data: decodedData
      });

      if (!iot) {
         throw ApiError.BadRequest('Error creating iot data');
      }

      return iot;
   }
}

module.exports = new IotService();