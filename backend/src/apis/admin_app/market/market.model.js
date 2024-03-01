const Sequelize = require("sequelize");
const sequelize = require("../../../configs/connection");
const State = require("../../../models/state")(sequelize, Sequelize);
const Lga = require("../../../models/lga")(sequelize, Sequelize);
const Market = require("../../../models/market")(sequelize, Sequelize);
const Category = require("../../../models/category")(sequelize, Sequelize);
const Item = require("./../../../models/items")(sequelize, Sequelize);

// Market.sync({ alter: true });
// State.sync({ alter: true });
// Lga.sync({ alter: true });
// Category.sync({ alter: true });
// Item.sync({ alter: true });

exports.marketModel = {
  createState: (state) => {
    return new Promise((resolve, reject) => {
      State.create(state).then(
        (state) => {
          resolve(state);
        },
        (err) => {
          reject({ err });
        }
      );
    });
  },

  createLga: (lga) => {
    return new Promise((resolve, reject) => {
      Lga.create(lga).then(
        (lga) => {
          resolve(lga);
        },
        (err) => {
          reject({ err });
        }
      );
    });
  },

  createMarket: (market) => {
    return new Promise((resolve, reject) => {
      Market.create(market).then(
        (market) => {
          resolve(market);
        },
        (err) => {
          reject({ err });
        }
      );
    });
  },

  createCategory: (category) => {
    return new Promise((resolve, reject) => {
      Category.create(category).then(
        (cat) => {
          resolve(cat);
        },
        (err) => {
          reject({ err });
        }
      );
    });
  },

  createItem: (itemData) => {
    return new Promise((resolve, reject) => {
      Item.create(itemData).then(
        (itemData) => {
          resolve(itemData);
        },
        (error) => {
          reject({ error });
        }
      );
    });
  },
};
