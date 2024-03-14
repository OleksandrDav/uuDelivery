class IotController {

   async getIotData(req, res) {
      try {
         const iotData = req.body;
         if (iotData && iotData.data !== undefined) {
            const encodedData = `${iotData.data}`;
            const decodedData = atob(encodedData);
            console.log(decodedData);
         } else {
            console.log("Metadata packet");
         }

         res.status(200).json(iotData);
      } catch (error) {
         console.log(error);
      }
   }
}

module.exports = new IotController();