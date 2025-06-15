const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const TicketPassenger = require("./ticket.passengers.model");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    passenger_id: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.DECIMAL(8, 2),
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "card", "mobile"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    paid_at: {
      type: DataTypes.timestamps,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Payment.belongsTo(TicketPassenger);
TicketPassenger.hasMany(Payment);

module.exports = Payment;
