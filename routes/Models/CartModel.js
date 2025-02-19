import { DataTypes } from "sequelize";
import { sequelize } from "../DBConfig/connection.js";
import ProductModel from "./ProductModel.js";

const CartModel = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
    underscored: true,
  }
);

CartModel.belongsTo(ProductModel, {
  foreignKey: "productId",
  as: "product",
});

export default CartModel;
