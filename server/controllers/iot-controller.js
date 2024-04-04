const iotService = require('../services/iot-service');
const { LPPDecoder } = require('lpp-node');

class IotController {
   async getIotData(req, res) {
      try {
         const iotData = req.body;
         let decodedData = {};

         if (iotData && iotData.data !== undefined) {
            const lpp = new LPPDecoder();
            const payload = Buffer.from(req.body.data, 'hex');
            decodedData = lpp.decode(payload);
            console.log(decodedData);
         } else {
            console.log("Metadata packet");
         }

         res.status(200).json(decodedData);
      } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   }
}

module.exports = new IotController();