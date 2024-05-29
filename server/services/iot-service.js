const iotModel = require('../models/iot-model');
const ApiError = require('../errors/api-error');
const trackerService = require('./tracker-service');
const orderService = require('./order-service');
const { LPPDecoder } = require('lpp-node');

class IotService {
   async createIotData(iotData) {

      let decodedData = {}
      const lpp = new LPPDecoder();
      const payload = Buffer.from(iotData.data, 'base64');
      decodedData = lpp.decode(payload);

      await trackerService.createTracker(iotData.deviceInfo.deviceProfileId);

      const iot = await iotModel.create({
         metadata: iotData.deviceInfo,
         timestamp: iotData.time,
         data: decodedData
      });

      if (!iot) {
         throw ApiError.BadRequest('Error creating iot data');
      }

      await orderService.damagedOrders(iotData.deviceInfo.deviceProfileId, decodedData[1].data, decodedData[2].data)

      return iot;
   }

   async getIotData(from, to, deviceProfileId) {
      const query = {};
      const timeRange = {};

      if (from) timeRange.$gte = new Date(from);
      if (to) timeRange.$lte = new Date(to);

      if (Object.keys(timeRange).length > 0) {
         query.timestamp = timeRange;
      }

      if (deviceProfileId) {
         query['metadata.deviceProfileId'] = deviceProfileId;
      }

      let iotData;

      if (deviceProfileId && !from && !to) {
         iotData = await iotModel.findOne(query).sort({ timestamp: -1 });
      } else {
         iotData = await iotModel.find(query);
      }

      if (!iotData || (Array.isArray(iotData) && iotData.length === 0)) {
         throw ApiError.NotFoundError('Iot data not found');
      }

      return iotData;
   }
}

module.exports = new IotService();