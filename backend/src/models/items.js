module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("item", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "yes",
    },
    prices: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("prices"));
      },
      set: function (val) {
        return this.setDataValue("prices", JSON.stringify(val));
      },
    },
    price_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
  });
  return Item;
};
