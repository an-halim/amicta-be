import { DataTypes } from "sequelize";
import db from "../db/index.js";
import schedules from "./schedules.js";

const users = db.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
});

schedules.belongsTo(users, { foreignKey: "user_id" });
users.hasMany(schedules, { foreignKey: "user_id" });

export default users;
