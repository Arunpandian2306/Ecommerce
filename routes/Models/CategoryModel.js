import { DataTypes } from "sequelize";
import { sequelize } from "../DBConfig/connection.js"; // Adjust the import path as needed

const CategoryModel = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

export default CategoryModel;
