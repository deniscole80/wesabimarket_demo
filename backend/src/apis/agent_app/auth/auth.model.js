const Sequelize = require("sequelize");
const multer = require("multer");
const sequelize = require("../../../configs/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Op = Sequelize.Op;

const Agents = require("../../../models/agents")(sequelize, Sequelize);

// Agents.sync({alter: true});

exports.authModel = {
  registerAgent: (agentData) => {
    let { password } = agentData;
    // console.log(password);
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, Salt) => {
        bcrypt.hash(password, Salt, (err, hash) => {
          if (err) console.log(err);

          console.log("Hashed password : ", hash);
          const updatedAgentData = { ...agentData, password: hash };
          Agents.create(updatedAgentData).then(
            (agent) => {
              resolve(agent);
            },
            (err) => {
              reject({ err });
            }
          );
        });
      });
    });
  },

//   login: ({ email }) => {
//     return new Promise((resolve, reject) => {
//       Users.findOne({
//         where: { email },
//       }).then(
//         (user) => {
//           if (user) {
//             resolve({
//               user: user.dataValues,
//             });
//           } else {
//             reject({ message: "Invalid login credentials" });
//           }
//         },
//         (err) => {
//           reject({ error: err });
//         }
//       );
//     });
//   },

//   sendCode: (data) => {
//     return new Promise((resolve, reject) => {
//       Users.findOne({
//         where: { email: data.email },
//       }).then(
//         async (user) => {
//           if (user) {
//             const createOtp = await Otp.upsert({ ...data });
//             // console.log("CreateOTP", createOtp);
//             if (createOtp) {
//               resolve(createOtp);
//             }
//           } else {
//             reject({ message: "unknown" });
//           }
//         },
//         (err) => {
//           reject({ error: err });
//         }
//       );
//     });
//   },

//   verifyCode: ({ email, code: v_code }) => {
//     return new Promise((resolve, reject) => {
//       Otp.findOne({
//         where: { email, v_code },
//       }).then(
//         async (otp) => {
//           if (otp) {
//             resolve(otp);
//           } else {
//             reject({ message: "invalid" });
//           }
//         },
//         (err) => {
//           reject({ error: err });
//         }
//       );
//     });
//   },

//   changePassword: ({ email, password }) => {
//     return new Promise((resolve, reject) => {
//       bcrypt.genSalt(saltRounds, (err, Salt) => {
//         bcrypt.hash(password, Salt, (err, hash) => {
//           if (err) console.log(err);

//           console.log("Hashed password : ", hash);
//           Users.update({ password: hash }, { where: { email } }).then(
//             (user) => {
//               resolve(user);
//             },
//             (err) => {
//               reject({ err });
//             }
//           );
//         });
//       });
//       // User.findOne({
//       //   where: { email, v_code },
//       // }).then(
//       //   async (otp) => {
//       //     if (otp) {
//       //       resolve(otp);
//       //     } else {
//       //       reject({ message: "invalid" });
//       //     }
//       //   },
//       //   (err) => {
//       //     reject({ error: err });
//       //   }
//       // );
//     });
//   },
};
