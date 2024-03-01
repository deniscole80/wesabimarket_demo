const { authController } = require("./auth.controller");
const Authenticate = require("../../../libs/middlewares/jwt_auth");
const { getRoute } = require("../../../libs/middlewares/get_route");
require("express-group-routes");

exports.authRoutes = function (app) {
  app.group("/agent/api/v1/auth/", (router) => {
    router.post("/register-agent", [getRoute], authController.registerAgent);

    // router.post("/login", [getRoute], authController.login);

    // router.post("/send-code", [getRoute], authController.sendCode);

    // router.post("/verify-code", [getRoute], authController.verifyCode);

    // router.post("/change-password", [getRoute], authController.changePassword);

    // router.post("/record-payment", [getRoute], authController.recordPayment);

    // router.post("/fetch-fund-history", [getRoute], authController.fetchFundHistory);

    // router.post("/add-delivery-address", [getRoute], authController.addDeliveryAddress);

    // router.post("/fetch-delivery-address", [getRoute], authController.fetchDeliveryAddress);
  });
};
