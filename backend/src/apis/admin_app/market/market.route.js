const { marketController } = require("./market.controller");
const Authenticate = require("../../../libs/middlewares/jwt_auth");
const { getRoute } = require("../../../libs/middlewares/get_route");
require("express-group-routes");

exports.marketRoutes = function (app) {
  app.group("/admin/api/v1/market/", (router) => {
    router.post("/create-state", [getRoute], marketController.createState);

    router.post("/create-lga", [getRoute], marketController.createLga);

    router.post("/create-market", [getRoute], marketController.createMarket);

    router.post(
      "/create-category",
      [getRoute],
      marketController.createCategory
    );

    router.post("/create-item", [getRoute], marketController.createItem);
  });
};
