const Sequelize = require("sequelize");
const multer = require("multer");
const sequelize = require("../../../configs/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Op = Sequelize.Op;
const _ = require("lodash");

const Users = require("../../../models/users")(sequelize, Sequelize);
const Otp = require("../../../models/otp")(sequelize, Sequelize);
const PaymentReference = require("../../../models/payment_reference")(sequelize, Sequelize);
const DeliveryAddress = require("../../../models/delivery_address")(sequelize, Sequelize);
const Agents = require("../../../models/agents")(sequelize, Sequelize);
const Cart = require("./../../../models/cart")(sequelize, Sequelize);

// Users.sync({alter: true});
// Otp.sync();
// PaymentReference.sync({alter: true})
// DeliveryAddress.sync({alter: true})

exports.authModel = {
  registerUser: (userData) => {
    let { password } = userData;
    // console.log(password);
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, Salt) => {
        bcrypt.hash(password, Salt, (err, hash) => {
          if (err) console.log(err);

          console.log("Hashed password : ", hash);
          const updatedUserData = { ...userData, password: hash };
          Users.create(updatedUserData).then(
            (user) => {
              resolve(user);
            },
            (err) => {
              reject({ err });
            }
          );
        });
      });
    });
  },

  login: ({ email }) => {
    return new Promise((resolve, reject) => {
      Users.findOne({
        where: { email },
      }).then(
        (user) => {
          if (user) {
            resolve({
              user: user.dataValues,
            });
          } else {
            reject({ message: "Invalid login credentials" });
          }
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  sendCode: (data) => {
    return new Promise((resolve, reject) => {
      Users.findOne({
        where: { email: data.email },
      }).then(
        async (user) => {
          if (user) {
            const createOtp = await Otp.upsert({ ...data });
            // console.log("CreateOTP", createOtp);
            if (createOtp) {
              resolve(createOtp);
            }
          } else {
            reject({ message: "unknown" });
          }
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  verifyCode: ({ email, code: v_code }) => {
    return new Promise((resolve, reject) => {
      Otp.findOne({
        where: { email, v_code },
      }).then(
        async (otp) => {
          if (otp) {
            resolve(otp);
          } else {
            reject({ message: "invalid" });
          }
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  changePassword: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, Salt) => {
        bcrypt.hash(password, Salt, (err, hash) => {
          if (err) console.log(err);

          console.log("Hashed password : ", hash);
          Users.update({ password: hash }, { where: { email } }).then(
            (user) => {
              resolve(user);
            },
            (err) => {
              reject({ err });
            }
          );
        });
      });
      // User.findOne({
      //   where: { email, v_code },
      // }).then(
      //   async (otp) => {
      //     if (otp) {
      //       resolve(otp);
      //     } else {
      //       reject({ message: "invalid" });
      //     }
      //   },
      //   (err) => {
      //     reject({ error: err });
      //   }
      // );
    });
  },

  recordPayment: ({ref, id: user_id, amount}) => {
    return new Promise((resolve, reject) => {
      PaymentReference.create({
        user_id, amount, ref
      }).then(
        async (ref) => {
          const userIncrement = await Users.increment({wallet_balance: amount}, {where: {id: user_id}});
          console.log("Wallet Balance", userIncrement[0][0][0]["wallet_balance"]);
          const wallet_balance = userIncrement[0][0][0]["wallet_balance"];
          ref.dataValues.wallet_balance = wallet_balance;
          resolve(ref);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchFundHistory: ({user_id}) => {
    // console.log("In the model");
    return new Promise((resolve, reject) => {
      PaymentReference.findAll({
        where: {user_id}
      }).then(
        async (funds) => {
          //   console.log(states);
          resolve(funds);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  addDeliveryAddress: (address) => {
    return new Promise((resolve, reject) => {
      DeliveryAddress.create(address).then(
        async (address) => {
          resolve(address);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchDeliveryAddress: ({user_id}) => {
    // console.log("In the model");
    return new Promise((resolve, reject) => {
      DeliveryAddress.findAll({
        where: {user_id}
      }).then(
        async (address) => {
          //   console.log(states);
          resolve(address);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  matchOrder: (order) => {
    // console.log("In the model", order);
    return new Promise(async (resolve, reject) => {
      const totalFee = order.agent_fee + order.delivery_fee + order.purchase_balance;
      const userDecrement = await Users.decrement({wallet_balance: totalFee}, {where: {id: order.user_id}});
      const agents = await Agents.findAll({where: {market_id: order.market_id}});
      const selectedAgent = await this.authModel.pickRightAgent(agents);
      const user = await Users.findByPk(order.user_id);
      console.log("Selected Agent", selectedAgent);
      const orderId = order.user_id +''+selectedAgent.dataValues.id+''+Math.floor(100000 + Math.random() * 900000);
      order.agent_id = selectedAgent.dataValues.id;
      order.order_id = orderId;
      Cart.create(order).then(
        async (order) => {
          order.dataValues.agent = selectedAgent.dataValues;
          order.dataValues.wallet_balance = user.dataValues.wallet_balance;
          console.log("User Balance user", user);
          resolve(order.dataValues);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  pickRightAgent: (agents) => {
    return new Promise((resolve, reject) => {
      if(Array.isArray(agents)){
        if(agents.length == 1){
          resolve(agents[0]);
        }else{
          resolve(_.sample(agents));
        }
      }else{
        reject("Not an array");
      }
    });
  },

  fetchOrders: ({user_id}) => {
    // console.log("In the model");
    return new Promise((resolve, reject) => {
      Cart.findAll({
        where: {user_id}
      }).then(
        async (carts) => {
          //   console.log(states);
          resolve(carts);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },
};
