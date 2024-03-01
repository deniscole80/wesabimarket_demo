const { marketController } = require("./market.controller");
const Authenticate = require("../../../libs/middlewares/jwt_auth");
const { getRoute } = require("../../../libs/middlewares/get_route");
require("express-group-routes");

exports.marketRoutes = function (app) {
  app.group("/user/api/v1/market/", (router) => {
    router.post("/get-states", [getRoute], marketController.getStates);
    router.post("/get-markets", [getRoute], marketController.getMarkets);
    router.post("/fetch-order", [getRoute], marketController.fetchOrder);
    router.post("/fetch-items", [getRoute], marketController.fetchItems);
    router.post("/search-items", [getRoute], marketController.searchItems);
    router.post(
      "/sort-item-by-category",
      [getRoute],
      marketController.sortItemByCategory
    );
  });
};
