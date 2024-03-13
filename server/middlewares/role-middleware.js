const ApiError = require('../errors/api-error');
const tokenService = require('../services/token-service');

module.exports = function (roleS) {
   return async function (req, res, next) {
      try {
         const authorizationHeader = req.headers.authorization;
         console.log(roleS);

         if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
         }

         const accessToken = authorizationHeader.split(' ')[1];
         if (!accessToken) {
            return next(ApiError.UnauthorizedError());
         }

         const userData = await tokenService.validateAccessToken(accessToken);
         console.log(userData);
         let hasRole = false;
         userData.roles.forEach(role => {
            if (roleS.includes(role)) {
               hasRole = true;
            }
         });

         if (!hasRole) {
            return next(ApiError.ForbiddenError());
         }
         next();
      } catch (e) {
         return next(ApiError.UnauthorizedError());
      }
   }
};