const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Driver = require("./Driver.model");

const Buses = sequelize.define(
  "buses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number_plate: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    seat_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Buses.hasMany(Driver);
Driver.belongsTo(Buses);

module.exports = Buses;
