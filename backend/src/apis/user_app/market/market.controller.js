const { marketModel } = require("./market.model");
const Utils = require("../../../configs/utils");
const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.marketController = {
  getStates: (req, res) => {
    // console.log(req.body);
    marketModel.getStates().then(
      (resp) => {
        // console.log(resp);
        res.status(successful.ok).send({
          message: "Successful",
          states: resp,
          err: null,
        });
      },
      (err) => {
        console.log(err);
        res.status(server_error.internal_server_error).send({
          message: "Error occured",
          states: null,
          error: err,
        });
      }
    );
  },

  getMarkets: (req, res) => {
    console.log(req.body);
    marketModel.getMarkets(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.ok).send({
          message: "Successful",
          markets: resp,
          err: null,
        });
      },
      (err) => {
        console.log(err);
        res.status(server_error.internal_server_error).send({
          message: "Error occured",
          markets: null,
          error: err,
        });
      }
    );
  },

  fetchOrder: (req, res) => {
    marketModel.fetchOrder(req.body).then(
      (resp) => {
        if (resp.length > 0) {
          res
            .status(successful.ok)
            .send({ message: "Orders found", data: resp });
        } else {
          res
            .status(successful.no_content)
            .send({ message: "No order found", data: [] });
        }
      },
      (error) => {
        console.log(error);
        res
          .status(server_error.internal_server_error)
          .send({ message: "Error occured", error: error, data: [] });
      }
    );
  },

  fetchItems: (req, res) => {
    marketModel.fetchItems().then(
      (resp) => {
        console.log("Items lookup", resp);
        if (resp.length > 0) {
          res
            .status(successful.ok)
            .send({ message: "Items found", items: resp });
        } else {
          res
            .status(successful.no_content)
            .send({ message: "No item found", items: [] });
        }
      },
      (error) => {
        console.log(error);
        res
          .status(server_error.internal_server_error)
          .send({ message: "Error occured", error: error, items: [] });
      }
    );
  },
  searchItems: (req, res) => {
    marketModel.searchItems(req.body).then(
      (resp) => {
        if (resp.length > 0) {
          res
            .status(successful.ok)
            .send({ message: "Items found", data: resp });
        } else {
          res
            .status(successful.no_content)
            .send({ message: "No item found", data: [] });
        }
      },
      (error) => {
        console.log(error);
        res
          .status(server_error.internal_server_error)
          .send({ message: "Error occured", error: error, data: [] });
      }
    );
  },
  sortItemByCategory: (req, res) => {
    marketModel.sortItemByCategory(req.body).then(
      (resp) => {
        if (resp.length > 0) {
          res
            .status(successful.ok)
            .send({ message: "Items found", data: resp });
        } else {
          res
            .status(successful.no_content)
            .send({ message: "No item found", data: [] });
        }
      },
      (error) => {
        console.log(error);
        res
          .status(server_error.internal_server_error)
          .send({ message: "Error occured", error: error, data: [] });
      }
    );
  },
};
