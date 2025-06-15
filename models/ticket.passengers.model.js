const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const BusSchedule = require("./bus_schedule.model");
const User = require("./user.model");

const TicketPassenger = sequelize.define(
  "ticket_passenger",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      validate: {
        is: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
      },
    },
    passport_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("selected", "active"),
      allowNull: false,
      defaultValue: "selected",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

TicketPassenger.belongsTo(BusSchedule);
BusSchedule.hasMany(TicketPassenger);
TicketPassenger.belongsTo(User);
User.hasMany(TicketPassenger);

module.exports = TicketPassenger;
