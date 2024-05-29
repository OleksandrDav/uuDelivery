const Router = require('express').Router;
const router = new Router();
const iotController = require('../controllers/iot-controller');

router.post('/data', iotController.createIotData);
router.get('/data', iotController.getIotData)

module.exports = router;