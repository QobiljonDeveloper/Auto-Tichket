const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const District = require("./district.model");
const BusRoute = require("./bus.routes.model");

const RouteStop = sequelize.define(
  "RouteStop",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    route_id: {
      type: DataTypes.INTEGER,
    },
    district_id: {
      type: DataTypes.INTEGER,
    },
    stop_order: {
      type: DataTypes.INTEGER,
    },
    arrival_time: {
      type: DataTypes.TIME,
    },
    departure_time: {
      type: DataTypes.TIME,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

RouteStop.belongsTo(District, { foreignKey: "district_id" });
RouteStop.belongsTo(BusRoute, { foreignKey: "route_id" });

module.exports = RouteStop;
