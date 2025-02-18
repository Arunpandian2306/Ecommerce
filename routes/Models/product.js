import { DataTypes } from "sequelize";
import { sequelize } from "../DBConfig/connection.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: "category_id", // 👈 Maps camelCase to snake_case
      references: {
        model: "categories",
        key: "id",
      },
    },
    imageUrl: {
      type: DataTypes.TEXT,
      field: "image_url", // 👈 Ensures correct column name
    },
  },
  {
    tableName: "products",
    timestamps: false,
    underscored: true, // 👈 Forces snake_case column names
  }
);

export default Product;
