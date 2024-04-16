const iotService = require('../services/iot-service');
const ApiError = require('../errors/api-error');

class IotController {
   async createIotData(req, res, next) {
      try {
         const iotData = req.body;
         let decodedData = {};
         if (iotData.data) {
            decodedData = await iotService.createIotData(iotData);
         } else {
            throw ApiError.BadRequest('Invalid request. Data field is required.');
         }
         return res.json(decodedData);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new IotController();