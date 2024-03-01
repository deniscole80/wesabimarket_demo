const { authModel } = require("./auth.model");
const Utils = require("../../../configs/utils");
const env = require("../../../configs/env");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.authController = {
  registerUser: (req, res) => {
    console.log(req.body);
    delete req.body.confirmPassword;
    req.body.gender = req.body.gender.value;
    authModel.registerUser(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send({
          message: "Successful",
          user: resp.dataValues,
        });
      },
      (err) => {
        console.log(err);
        res.status(server_error.internal_server_error).send({
          message: "Error occured",
          user: null,
          error: err,
        });
      }
    );
  },

  login: (req, res) => {
    // console.log(req.body);
    authModel.login(req.body).then(
      ({ user }) => {
        // console.log(user);
        const password = user.password;
        bcrypt.compare(req.body.password, password).then((resp) => {
          if (resp) {
            const token = jwt.sign({ user }, env.token_password, {
              expiresIn: "2h",
            });
            res.status(successful.accepted).send({
              message: "Successful",
              user,
              token,
            });
          } else {
            res.status(client_error.not_acceptable).send({
              message: "Invalid login credentials",
              token: null,
              user: null,
            });
          }
        });
      },
      (err) => {
        console.log("Error", err);
        if (err.message == "Invalid login credentials") {
          res.status(client_error.not_found).send({
            message: err.message,
            user: null,
            error: err,
          });
        } else {
          res.status(server_error.internal_server_error).send({
            message: "An error occured",
            user: null,
            error: err,
          });
        }
      }
    );
  },

  sendCode: (req, res) => {
    console.log(req.body);
    req.body.v_code = Math.floor(100000 + Math.random() * 900000);
    authModel.sendCode(req.body).then(
      (resp) => {
        console.log(resp[0].dataValues);
        res.status(successful.created).send({
          message: "OTP sent successfully",
          // otp: resp[0].dataValues,
          error: null,
        });
      },
      (err) => {
        console.log("Error", err);
        if (err.message == "unknown") {
          res.status(client_error.not_found).send({
            message: "Email address does not exist",
            otp: null,
            error: err,
          });
        }
      }
    );
  },

  verifyCode: (req, res) => {
    console.log(req.body);
    authModel.verifyCode(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.accepted).send({
          message: "OTP is verified successfully",
          error: null,
        });
      },
      (err) => {
        console.log("Error", err);
        if (err.message == "invalid") {
          res.status(client_error.not_acceptable).send({
            message: "Invalid OTP",
            error: err,
          });
        } else {
          res.status(server_error.internal_server_error).send({
            message: "An error occured",
            error: err,
          });
        }
      }
    );
  },

  changePassword: (req, res) => {
    console.log(req.body);
    authModel.changePassword(req.body).then(
      (resp) => {
        console.log("Success", resp);
        res.status(successful.created).send({
          message: "Password changed successfully",
          error: null,
        });
      },
      (err) => {
        console.log("Error", err);
        res.status(server_error.internal_server_error).send({
          message: "An error occured",
          error: err,
        });
      }
    );
  },

  recordPayment: (req, res) => {
    console.log(req.body);
    authModel.recordPayment(req.body).then(
      (resp) => {
        console.log("Success", resp);
        res.status(successful.created).send({
          message: "success",
          balance: resp.dataValues.wallet_balance,
          error: null,
        });
      },
      (err) => {
        console.log("Error", err);
        res.status(server_error.internal_server_error).send({
          message: "failed",
          error: err,
        });
      }
    );
  },

  fetchFundHistory: (req, res) => {
    // console.log(req.body);
    authModel.fetchFundHistory(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.ok).send({
          message: "Successful",
          fundHistory: resp,
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

  addDeliveryAddress: (req, res) => {
    console.log(req.body);
    authModel.addDeliveryAddress(req.body).then(
      (resp) => {
        console.log("Success", resp);
        res.status(successful.created).send({
          message: "success",
          deliveryAddress: resp.dataValues,
          error: null,
        });
      },
      (err) => {
        console.log("Error", err);
        res.status(server_error.internal_server_error).send({
          message: "failed",
          error: err,
        });
      }
    );
  },

  fetchDeliveryAddress: (req, res) => {
    console.log(req.body);
    authModel.fetchDeliveryAddress(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.ok).send({
          message: "Successful",
          deliveryAddress: resp,
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

  matchOrder: (req, res) => {
    console.log(req.body);
    authModel.matchOrder(req.body).then((resp) => {
      console.log("Matched Order", resp);
      res.status(successful.ok).send({
        message: "Successful",
        agent: resp.agent,
        wallet_balance: resp.wallet_balance,
        err: null,
      });
    }, (err) => {
      console.log(err);
      res.status(server_error.internal_server_error).send({
        message: "Error occured",
        agent: null,
        error: err,
      });
    });
  },

  fetchOrders: (req, res) => {
    console.log(req.body);
    authModel.fetchOrders(req.body).then(
      (resp) => {
        console.log("Orders List", resp);
        res.status(successful.ok).send({
          message: "Successful",
          orders: resp,
          err: null,
        });
      },
      (err) => {
        console.log(err);
        res.status(server_error.internal_server_error).send({
          message: "Error occured",
          orders: null,
          error: err,
        });
      }
    );
  },
};
