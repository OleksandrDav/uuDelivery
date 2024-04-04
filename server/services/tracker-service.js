const trackerModel = require('../models/tracker-model');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-error');

class TrackerService {
   async createTracker() {
      const tracker = await trackerModel.create({ status: "deactivated", inOrder: false });
      if (!tracker) {
         throw ApiError.BadRequest('Error creating tracker');
      }
      return tracker;
   }
   async getTrackers() {
      const trackers = await trackerModel.find();
      if(trackers.length === 0){
         throw ApiError.NotFoundError('Trackers not found');
      }
      return trackers;
   }
   async getTrackerById(id) {
      if (!id || id === ":id") {
         throw ApiError.BadRequest('Id is not defined');
      }
      const tracker = await trackerModel.findById(id);
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
   async updateTrackerStatus(id, status) {
      if (!id || id === ":id") {
         throw ApiError.BadRequest('Id is not defined');
      }
      if (!status) {
         throw ApiError.BadRequest('Status is not defined');
      }
      const tracker = await trackerModel.findByIdAndUpdate(id, { status: status }, { new: true });
      if (tracker === null) {
         throw ApiError.NotFoundError('Tracker not found');
      }
      return tracker;
   }

   async updateTrackerInOrder(id, inOrder) {
      if (!id || id === ":id") {
         throw ApiError.BadRequest('Id is not defined');
      }
      if (!inOrder && inOrder !== false) {
         throw ApiError.BadRequest('InOrder is not defined');
      }
      const tracker = await trackerModel.findByIdAndUpdate(id, { inOrder: inOrder }, { new: true });
      if (tracker === null) {
         throw ApiError.NotFoundError('Tracker not found');
      }
      return tracker;
   }
}

module.exports = new TrackerService();