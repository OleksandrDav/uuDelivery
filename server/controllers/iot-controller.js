const iotService = require('../services/iot-service');
const ApiError = require('../errors/api-error');

class IotController {
   async createIotData(req, res, next) {
      try {
         const iotData = req.body;
         let decodedData = {};
         if (iotData.data) {
            decodedData = await iotService.createIotData(iotData);
         }
         return res.json(decodedData);
      } catch (error) {
         next(error);
      }
   }
   async getIotData(req, res, next) {
      try {
         const { from, to, deviceProfileId } = req.body;

         const iotData = await iotService.getIotData(from, to, deviceProfileId);
         return res.json(iotData);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new IotController();