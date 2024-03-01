module.exports = (sequelize, DataTypes) => {
    const DeliveryAddress = sequelize.define("delivery_address", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false 
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false 
      },
      mobile1: {
        type: DataTypes.STRING,
        allowNull: false 
      },
      mobile2: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: DataTypes.DATE,
    });
    return DeliveryAddress;
  };
  