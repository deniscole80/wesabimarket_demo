module.exports = (sequelize, DataTypes) => {
    const PaymentReference = sequelize.define("payment_reference", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Credit" 
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Wallet funding"
      },
      via: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Card"
      },
      ref: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: DataTypes.DATE,
    });
    return PaymentReference;
  };
  