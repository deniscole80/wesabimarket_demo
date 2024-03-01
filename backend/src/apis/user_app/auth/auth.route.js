const { authController } = require("./auth.controller");
const Authenticate = require("../../../libs/middlewares/jwt_auth");
const { getRoute } = require("../../../libs/middlewares/get_route");
require("express-group-routes");

exports.authRoutes = function (app) {
  app.group("/user/api/v1/auth/", (router) => {
    router.post("/register-user", [getRoute], authController.registerUser);

    router.post("/login", [getRoute], authController.login);

    router.post("/send-code", [getRoute], authController.sendCode);

    router.post("/verify-code", [getRoute], authController.verifyCode);

    router.post("/change-password", [getRoute], authController.changePassword);

    router.post("/record-payment", [getRoute], authController.recordPayment);

    router.post("/fetch-fund-history", [getRoute], authController.fetchFundHistory);

    router.post("/add-delivery-address", [getRoute], authController.addDeliveryAddress);

    router.post("/fetch-delivery-address", [getRoute], authController.fetchDeliveryAddress);

    router.post("/match-order", [getRoute], authController.matchOrder);

    router.post("/fetch-orders", [getRoute], authController.fetchOrders);
  });
};
