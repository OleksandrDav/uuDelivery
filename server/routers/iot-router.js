const Router = require('express').Router;
const router = new Router();
const iotController = require('../controllers/iot-controller');

router.post('/iot_data', iotController.getIotData)

module.exports = router;