const { validationResult } = require('express-validator');
const ApiError = require('../errors/api-error');
const trackerService = require('../services/tracker-service');

class TrackerController {
   async createTracker(req, res, next) {
      try {
         const tracker = await trackerService.createTracker();
         return res.json(tracker);
      } catch (error) {
         next(error);
      }
   }
   async getTrackers(req, res, next) {
      try {
         const trackers = await trackerService.getTrackers();
         return res.json(trackers);
      } catch (error) {
         next(error);
      }
   }
   async getTrackerById(req, res, next) {
      try {
         const { id } = req.params;
         const tracker = await trackerService.getTrackerById(id);
         return res.json(tracker);
      } catch (error) {
         next(error);
      }
   }
   async getNotInOrder(req, res, next) {
      try {
         const tracker = await trackerService.getNotInOrder();
         return res.json(tracker);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new TrackerController();