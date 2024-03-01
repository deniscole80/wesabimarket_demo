const Sequelize = require("sequelize");
const sequelize = require("../../../configs/connection");
const State = require("../../../models/state")(sequelize, Sequelize);
const Lga = require("../../../models/lga")(sequelize, Sequelize);
const Market = require("../../../models/market")(sequelize, Sequelize);
const Cart = require("./../../../models/cart")(sequelize, Sequelize);
const Item = require("./../../../models/items")(sequelize, Sequelize);
const Category = require("./../../../models/category")(sequelize, Sequelize);
const Op = Sequelize.Op;

// State.sync({ alter: true });
// Lga.sync({ alter: true });
// Market.sync({ alter: true });
// Cart.sync({ alter: true });

exports.marketModel = {
  getStates: () => {
    // console.log("In the model");
    return new Promise((resolve, reject) => {
      State.hasMany(Lga, { foreignKey: "state_id" });
      Lga.belongsTo(State, { foreignKey: "state_id" });
      State.findAll({
        include: [Lga],
      }).then(
        async (states) => {
          //   console.log(states);
          resolve(states);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  getMarkets: ({ state_id }) => {
    // console.log("In the model");
    return new Promise((resolve, reject) => {
      Market.findAll({ where: { state_id } }).then(
        async (markets) => {
          //   console.log(states);
          resolve(markets);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchOrder: (userData) => {
    const { user_id } = userData;

    return new Promise((resolve, reject) => {
      Cart.findAll({
        where: {
          user_id,
        },
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "user_id",
          "items",
          "status",
          "order_id",
          "total",
          "createdAt",
        ],
      }).then(
        (resp) => {
          resolve(resp);
        },
        (error) => {
          reject({ error });
        }
      );
    });
  },

  fetchItems: () => {
    return new Promise((resolve, reject) => {
      Category.hasMany(Item, { foreignKey: "category_id" });
      Item.belongsTo(Category, { foreignKey: "category_id" });
      Item.findAll({
        order: [["id", "DESC"]],
        // limit: 8,
        include: [Category],
      }).then(
        (resp) => {
          resolve(resp);
        },
        (error) => {
          reject({ error });
        }
      );
    });
  },

  searchItems: (searchData) => {
    const { keyword } = searchData;

    return new Promise((resolve, reject) => {
      Item.findAll({
        where: {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        order: [["id", "DESC"]],
      }).then(
        (resp) => {
          resolve(resp);
        },
        (error) => {
          reject({ error });
        }
      );
    });
  },

  sortItemByCategory: (sortData) => {
    const { category_id } = sortData;
    const propertyName = "category";
    return new Promise((resolve, reject) => {
      Item.findAll({
        where: sequelize.literal(`${propertyName}->>'id' = '${category_id}'`),
      }).then(
        (sortData) => {
          resolve(sortData);
        },
        (error) => {
          reject({ error });
        }
      );
    });
  },
};
