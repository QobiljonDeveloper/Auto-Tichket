const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const District = require("./district.model");

const BusRoute = sequelize.define(
  "BusRoute",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from_district_id: {
      type: DataTypes.INTEGER,
    },
    to_district_id: {
      type: DataTypes.INTEGER,
    },
    distance_km: {
      type: DataTypes.FLOAT,
    },
    estimated_time: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

BusRoute.belongsTo(District, { foreignKey: "from_district_id" });
BusRoute.belongsTo(District, { foreignKey: "to_district_id" });

module.exports = BusRoute;
