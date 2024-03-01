module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    market_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cart: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("cart"));
      },
      set: function (val) {
        return this.setDataValue("cart", JSON.stringify(val));
      },
    },
    delivery_address: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("delivery_address"));
      },
      set: function (val) {
        return this.setDataValue("delivery_address", JSON.stringify(val));
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "matched",
    },
    purchase_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agent_fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
  });
  return Cart;
};
