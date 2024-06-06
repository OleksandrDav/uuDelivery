const orderModel = require("../models/order-model");
const ApiError = require('../errors/api-error');
const trackerService = require('./tracker-service');
const mailService = require("./mail-service");

class OrderService {
   async createOrder(destination, customerEmail, temperatureMax, temperatureMin, tiltAngleMax) {
      const order = await orderModel.create({
         destination,
         customerEmail,
         temperatureMax,
         temperatureMin,
         tiltAngleMax,
         trackerId: null,
         userId: null,
         damaged: false,
         start: null,
         end: null
      });
      if (!order) {
         throw ApiError.BadRequest('Error creating order');
      }
      return order;
   }

   async getOrders(filterCriteria = {}) {
      let query = {};
      if (filterCriteria.userId) {
         query.userId = filterCriteria.userId;
      }

      if (filterCriteria.start !== undefined) {
         if (filterCriteria.start === true) {
            query.start = { $ne: null };
         } else {
            query.start = null;
         }
      }

      if (filterCriteria.end !== undefined) {
         if (filterCriteria.end === true) {
            query.end = { $ne: null };
         } else {
            query.end = null;
         }
      }

      const orders = await orderModel.find(query);
      if (orders.length === 0) {
         throw ApiError.NotFoundError('Orders not found');
      }
      return orders;
   }

   async getOneOrder(id) {
      if (id === null || id === undefined || id === ":id") {
         throw ApiError.BadRequest('Id is not defined');
      }
      const order = await orderModel.findById(id);
      if (!order) {
         throw ApiError.NotFoundError('Order not found');
      }
      return order;
   }

   async startOrder(ids, userId) {
      const tracker = await trackerService.getNotInOrder();
      if (!tracker) {
         throw ApiError.BadRequest('No available trackers');
      }

      const orders = await orderModel.find({ _id: { $in: ids } });
      if (!orders || orders.length === 0) {
         throw ApiError.NotFoundError('Orders not found');
      }

      const updatedOrders = [];
      for (const order of orders) {
         const updatedOrder = await orderModel.findByIdAndUpdate(order._id, { trackerId: tracker.trackerId, userId, start: new Date().toISOString() }, { new: true });
         if (!updatedOrder) {
            throw ApiError.BadRequest(`Error starting order with ID ${order._id}`);
         }
         updatedOrders.push(updatedOrder);
         await mailService.startOrderMail(order.destination, order.customerEmail, order._id);
      }

      await trackerService.updateTrackerInOrder(tracker.trackerId, true);
      return updatedOrders;
   }

   async endOrder(id) {
      const order = await orderModel.findByIdAndUpdate(id, { end: new Date().toISOString() }, { new: true });
      if (!order) {
         throw ApiError.BadRequest('Order not found');
      }
      const tracker = await trackerService.getTrackerById(order.trackerId);
      if (!tracker) {
         throw ApiError.BadRequest('Tracker not found');
      }

      const otherOrders = await orderModel.find({ trackerId: tracker.trackerId, end: null });
      if (otherOrders.length === 0) {
         await trackerService.updateTrackerInOrder(tracker.trackerId, false);
      }

      await mailService.endOrderMail(order.customerEmail, order._id);
      return order;
   }

   async deleteOrder(id) {
      if (!id || id === ":id") {
         throw ApiError.BadRequest('Id is not defined');
      }
      const order = await orderModel.findByIdAndDelete(id);
      if (!order) {
         throw ApiError.BadRequest('Order not found');
      }
      return order;
   }

   async damagedOrders(trackerId, temperature, tiltAngle) {
      const orders = await orderModel.find({ trackerId, end: null });
      if (orders.length === 0) {
         return orders;
      }
      for (const order of orders) {
         if (order.temperatureMax > temperature
            || order.temperatureMin < temperature
            || order.tiltAngleMax < tiltAngle.x
            || order.tiltAngleMax < tiltAngle.y) {
            if (!order.damaged) {
               await orderModel.findByIdAndUpdate(order._id, { damaged: true });
               await mailService.damagedOrderMail(order.customerEmail, order._id);
            }
         }
      }
      return orders;
   }
}

module.exports = new OrderService();