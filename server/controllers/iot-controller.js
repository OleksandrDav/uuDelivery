class IotController {

  async getIotData(req, res) {
    try {
      const iotData = req.body;
      console.log(iotData);
      res.status(200).json(iotData);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new IotController();