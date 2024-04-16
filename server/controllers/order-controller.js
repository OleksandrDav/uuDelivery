const { validationResult } = require('express-validator');
const ApiError = require('../errors/api-error');
const orderService = require('../services/order-service');

class OrderController {
   async createOrder(req, res, next) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation error', errors.array()));
         }
         const { destination, customerEmail, temperatureMax, temperatureMin, tiltAngleMax } = req.body;
         const orderData = await orderService.createOrder(
            destination,
            customerEmail,
            temperatureMax,
            temperatureMin,
            tiltAngleMax
         );
         return res.json(orderData);
      } catch (error) {
         next(error);
      }
   }
   async getOrders(req, res, next) {
      try {
         const filterCriteria = req.body;
         const orders = await orderService.getOrders(filterCriteria);
         return res.json(orders);
      } catch (error) {
         next(error);
      }
   }
   async getOneOrder(req, res, next) {
      try {
         const { id } = req.params;
         const order = await orderService.getOneOrder(id);
         return res.json(order);
      } catch (error) {
         next(error);
      }
   }
   async updateOrder(req, res, next) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation error', errors.array()));
         }
         const { id, userId, start, end } = req.body;
         if ((start && end) || (!start && !end)) {
            return next(ApiError.BadRequest('Invalid request. Either start or end flag should be true.'));
         }
         let orderData;
         if (start) {
            orderData = await orderService.startOrder(id, userId);
         } else if (end) {
            orderData = await orderService.endOrder(id);
         }
         return res.json(orderData);
      } catch (error) {
         next(error);
      }
   }
   async deleteOrder(req, res, next) {
      try {
         const { id } = req.params;
         const order = await orderService.deleteOrder(id);
         return res.json(order);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new OrderController();