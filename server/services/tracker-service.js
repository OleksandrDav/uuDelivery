const trackerModel = require('../models/tracker-model');
const ApiError = require('../errors/api-error');

class TrackerService {
   async createTracker(trackerId) {
      const existingTracker = await trackerModel.findOne({trackerId: trackerId});
   if (existingTracker) {
      return existingTracker;
   } else {
      const newTracker = await trackerModel.create({ trackerId, status: "new", inOrder: false });
      if (!newTracker) {
         throw ApiError.BadRequest('Error creating tracker');
      }
      return newTracker;
   }
   }
   async getTrackers() {
      const trackers = await trackerModel.find();
      if(trackers.length === 0){
         throw ApiError.NotFoundError('Trackers not found');
      }
      return trackers;
   }
   async getTrackerById(trackerId) {
      if (!trackerId) {
         throw ApiError.BadRequest('Id is not defined');
      }
      const tracker = await trackerModel.findOne({trackerId: trackerId});
      if (tracker === null) {
         throw ApiError.NotFoundError('Tracker not found');
      }
      return tracker;
   }
   async deleteTracker(trackerId) {
      if (!trackerId) {
         throw ApiError.BadRequest('Id is not defined');
      }
      const tracker = await trackerModel.findOneAndDelete({trackerId: trackerId});
      if (tracker === null) {
         throw ApiError.NotFoundError('Tracker not found');
      }
      return tracker;
   }
   async getNotInOrder() {
      const tracker = await trackerModel.findOne({ status: "active", inOrder: false });
      if (tracker === null) {
         throw ApiError.NotFoundError('Tracker not found. There are no active trackers or not in order');
      }
      return tracker;
   }
   async updateTrackerStatus(trackerId, status) {
      if (!trackerId) {
         throw ApiError.BadRequest('Id is not defined');
      }
      if (!status) {
         throw ApiError.BadRequest('Status is not defined');
      }
      const tracker = await trackerModel.findOneAndUpdate({trackerId: trackerId}, { status: status }, { new: true });
      if (tracker === null) {
         throw ApiError.NotFoundError('Tracker not found');
      }
      return tracker;
   }

   async updateTrackerInOrder(trackerId, inOrder) {
      if (!trackerId) {
         throw ApiError.BadRequest('Id is not defined');
      }
      if (!inOrder && inOrder !== false) {
         throw ApiError.BadRequest('InOrder is not defined');
      }
      const tracker = await trackerModel.findOneAndUpdate({trackerId: trackerId}, { inOrder: inOrder }, { new: true });
      if (tracker === null) {
         throw ApiError.NotFoundError('Tracker not found');
      }
      return tracker;
   }
}

module.exports = new TrackerService();