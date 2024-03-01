const { marketModel } = require("./market.model");
const Utils = require("../../../configs/utils");
const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.marketController = {
  createState: (req, res) => {
    console.log(req.body);
    marketModel.createState(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.created).send({
          message: "Successful",
          state: resp.dataValues,
        });
      },
      (err) => {
        res.status(server_error.internal_server_error).send({
          message: "Error occured",
          state: null,
          error: err,
        });
      }
    );
  },

  createLga: (req, res) => {
    console.log(req.body);
    marketModel.createLga(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.created).send({
          message: "Successful",
          state: resp.dataValues,
        });
      },
      (err) => {
        res.status(server_error.internal_server_error).send({
          message: "Error occured",
          state: null,
          error: err,
        });
      }
    );
  },

  createMarket: (req, res) => {
    console.log(req.body);
    marketModel.createMarket(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.created).send({
          message: "Successful",
          state: resp.dataValues,
        });
      },
      (err) => {
        res.status(server_error.internal_server_error).send({
          message: "Error occured",
          state: null,
          error: err,
        });
      }
    );
  },

  createCategory: (req, res) => {
    console.log(req.body);
    marketModel.createCategory(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.created).send({
          message: "Successful",
          error: null,
        });
      },
      (err) => {
        res.status(server_error.internal_server_error).send({
          message: "Error occured",
          error: err,
        });
      }
    );
  },

  createItem: (req, res) => {
    // console.log("ITEM >>>>>>>>>>>>..", req.body);
    marketModel.createItem(req.body).then(
      (resp) => {
        if (resp) {
          res.status(successful.created).send({
            message: "Item created successfully",
            item: resp.dataValues,
          });
        } else {
          res
            .status(server_error.service_unavailable)
            .send({ message: "Server error", item: [] });
        }
      },
      (error) => {
        console.log(error);
        res
          .status(server_error.internal_server_error)
          .send({ message: "Error occured", error: error, item: [] });
      }
    );
  },
};
