const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const BusRoute = require("./bus.routes.model");
const RouteStop = require("./route.stop.model");

const SubRoute = sequelize.define(
  "SubRoute",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    route_id: {
      type: DataTypes.INTEGER,
    },
    from_stop_id: {
      type: DataTypes.INTEGER,
    },
    to_stop_id: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

SubRoute.belongsTo(BusRoute, { foreignKey: "route_id" });
SubRoute.belongsTo(RouteStop, { foreignKey: "from_stop_id" });
SubRoute.belongsTo(RouteStop, { foreignKey: "to_stop_id" });

module.exports = SubRoute;
