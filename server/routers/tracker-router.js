const Router = require('express').Router;
const router = new Router();
const { body } = require('express-validator');
const trackerController = require('../controllers/tracker-controller');

router.post("/", trackerController.createTracker);
router.get("/", trackerController.getTrackers);
router.get("/notInOrder", trackerController.getNotInOrder);
router.get("/:id", trackerController.getTrackerById)


module.exports = router;