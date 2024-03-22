const orderModel = require("../models/order-model");
const ApiError = require('../errors/api-error');
const trackerService = require('./tracker-service');
const mailService = require("./mail-service");

class OrderService {
   async createOrder(destination, customerEmail) {
      const order = await orderModel.create({ destination, customerEmail, trackerId: null, userId: null, start: null, end: null });
      if (!order) {
         throw ApiError.BadRequest('Error creating order');
      }
      return order;
   }

   async getOrders() {
      const orders = await orderModel.find();
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

   async startOrder(id, userId) {
      const tracker = await trackerService.getNotInOrder();
      if (!tracker) {
         throw ApiError.BadRequest('No available trackers');
      }
      const order = await orderModel.findByIdAndUpdate(id, { trackerId: tracker, userId, start: new Date().toISOString() }, { new: true });
      if (!order) {
         throw ApiError.BadRequest('Order not found');
      }
      await mailService.startOrderMail(order.destination, order.customerEmail, order._id);
      return order;
   }

   async endOrder(id) {
      const order = await orderModel.findByIdAndUpdate(id, { end: new Date().toISOString() }, { new: true });
      if (!order) {
         throw ApiError.BadRequest('Order not found');
      }
      await mailService.endOrderMail(order.customerEmail, order._id);
      return order;
   }

   async deleteOrder(id) {
      if (!id || id === ":id" ) {
         throw ApiError.BadRequest('Id is not defined');
      }
      const order = await orderModel.findByIdAndDelete(id);
      if (!order) {
         throw ApiError.BadRequest('Order not found');
      }
      return order;
   }
}

module.exports = new OrderService();