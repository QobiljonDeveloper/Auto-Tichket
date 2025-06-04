const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Bus = require("./buses.model");
const Driver = require("./Driver.model");

const BusDriver = sequelize.define(
  "bus_driver",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Bus.belongsToMany(Driver, {
  through: BusDriver,
  foreignKey: "busId",
  otherKey: "driverId",
});

Driver.belongsToMany(Bus, {
  through: BusDriver,
  foreignKey: "driverId",
  otherKey: "busId",
});

BusDriver.belongsTo(Bus, { foreignKey: "busId" });
BusDriver.belongsTo(Driver, { foreignKey: "driverId" });

module.exports = BusDriver;
