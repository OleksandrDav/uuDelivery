class IotController {

   async getIotData(req, res) {
      try {
         const iotData = req.body;
         const encodedData = `${iotData?.data}`;
         if (encodedData) {
            const decodedData = atob(encodedData);
            console.log(decodedData);
         }

         res.status(200).json(iotData);
      } catch (error) {
         console.log(error);
      }
   }
}

module.exports = new IotController();