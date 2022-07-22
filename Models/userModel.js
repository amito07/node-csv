import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

const { STRING } = DataTypes;

const userModel = sequelize.define("user", {
  email: {
    type: STRING,
    allowNull: false,
    primaryKey:true
  },
  name:{
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
},{
    timestamps:true
});

export default userModel;
