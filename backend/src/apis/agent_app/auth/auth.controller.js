const { authModel } = require("./auth.model");
const Utils = require("../../../configs/utils");
const env = require("../../../configs/env");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.authController = {
  registerAgent: (req, res) => {
    console.log(req.body);
    delete req.body.confirmPassword;
    req.body.gender = req.body.gender.value;
    authModel.registerAgent(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send({
          message: "Successful",
          agent: resp.dataValues,
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

//   login: (req, res) => {
//     // console.log(req.body);
//     authModel.login(req.body).then(
//       ({ user }) => {
//         // console.log(user);
//         const password = user.password;
//         bcrypt.compare(req.body.password, password).then((resp) => {
//           if (resp) {
//             const token = jwt.sign({ user }, env.token_password, {
//               expiresIn: "2h",
//             });
//             res.status(successful.accepted).send({
//               message: "Successful",
//               user,
//               token,
//             });
//           } else {
//             res.status(client_error.not_acceptable).send({
//               message: "Invalid login credentials",
//               token: null,
//               user: null,
//             });
//           }
//         });
//       },
//       (err) => {
//         console.log("Error", err);
//         if (err.message == "Invalid login credentials") {
//           res.status(client_error.not_found).send({
//             message: err.message,
//             user: null,
//             error: err,
//           });
//         } else {
//           res.status(server_error.internal_server_error).send({
//             message: "An error occured",
//             user: null,
//             error: err,
//           });
//         }
//       }
//     );
//   },

//   sendCode: (req, res) => {
//     console.log(req.body);
//     req.body.v_code = Math.floor(100000 + Math.random() * 900000);
//     authModel.sendCode(req.body).then(
//       (resp) => {
//         console.log(resp[0].dataValues);
//         res.status(successful.created).send({
//           message: "OTP sent successfully",
//           // otp: resp[0].dataValues,
//           error: null,
//         });
//       },
//       (err) => {
//         console.log("Error", err);
//         if (err.message == "unknown") {
//           res.status(client_error.not_found).send({
//             message: "Email address does not exist",
//             otp: null,
//             error: err,
//           });
//         }
//       }
//     );
//   },

//   verifyCode: (req, res) => {
//     console.log(req.body);
//     authModel.verifyCode(req.body).then(
//       (resp) => {
//         console.log(resp);
//         res.status(successful.accepted).send({
//           message: "OTP is verified successfully",
//           error: null,
//         });
//       },
//       (err) => {
//         console.log("Error", err);
//         if (err.message == "invalid") {
//           res.status(client_error.not_acceptable).send({
//             message: "Invalid OTP",
//             error: err,
//           });
//         } else {
//           res.status(server_error.internal_server_error).send({
//             message: "An error occured",
//             error: err,
//           });
//         }
//       }
//     );
//   },

//   changePassword: (req, res) => {
//     console.log(req.body);
//     authModel.changePassword(req.body).then(
//       (resp) => {
//         console.log("Success", resp);
//         res.status(successful.created).send({
//           message: "Password changed successfully",
//           error: null,
//         });
//       },
//       (err) => {
//         console.log("Error", err);
//         res.status(server_error.internal_server_error).send({
//           message: "An error occured",
//           error: err,
//         });
//       }
//     );
//   },

};
