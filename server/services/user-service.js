const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-error');

class UserService {
   async registration(email, password, name, surname, role) {
      const candidate = await userModel.findOne({ email });
      if (candidate) {
         throw ApiError.BadRequest(`User with email ${email} already exists`);
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const user = await userModel.create({ email, password: hashPassword, roles: [role], name, surname });

      const userDto = new UserDto(user);
      const tokens = await tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto }
   }

   async login(email, password) {
      const user = await userModel.findOne({ email });
      if (!user) {
         throw ApiError.BadRequest(`User with email ${email} not found`);
      }
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
         throw ApiError.BadRequest(`Wrong password`);
      }
      const userDto = new UserDto(user);
      const tokens = await tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto }
   }

   async logout(refreshToken) {
      const token = await tokenService.removeToken(refreshToken);
      return token;
   }

   async refresh(refreshToken) {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError();
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
         throw ApiError.UnauthorizedError();
      }
      const user = await userModel.findById(userData.id);
      const userDto = new UserDto(user);
      const tokens = await tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto }
   }

   async getUsers() {
      const users = await userModel.find();
      return users;
   }
}

module.exports = new UserService();