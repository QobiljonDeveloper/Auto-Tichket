const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Buses = require("./buses.model");

const BusSchedule = sequelize.define(
  "bus_schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departure_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

BusSchedule.belongsTo(BusRoutes);
BusRoutes.hasMany(BusSchedule);
BusSchedule.belongsTo(Buses);
Buses.hasMany(BusSchedule);

module.exports = BusSchedule;
