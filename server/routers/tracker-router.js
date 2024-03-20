const Router = require('express').Router;
const router = new Router();
const { body } = require('express-validator');
const trackerController = require('../controllers/tracker-controller');

router.post("/", trackerController.createTracker);
router.get("/", trackerController.getTrackers);
router.get("/notInOrder", trackerController.getNotInOrder);
router.get("/:id", trackerController.getTrackerById)
router.put("/:id",
   body('status').isString().contains("active" || "deactivated").withMessage('Status must be an active or deactivated string.'),
   trackerController.updateTrackerStatus);

module.exports = router;