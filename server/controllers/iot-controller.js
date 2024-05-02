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
   async getIotDataByTimestampRange(req, res, next) {
      try {
         const { from, to } = req.body;
         if (!from || !to) {
            throw ApiError.BadRequest('Please provide both "from" and "to" timestamps');
         }

         const iotData = await iotService.getIotDataByTimestampRange(from, to);
         return res.json(iotData);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new IotController();