const Router = require('express').Router;
const router = new Router();
const iotController = require('../controllers/iot-controller');

router.post('/data', iotController.createIotData);
router.post('/getData', iotController.getIotData)

module.exports = router;