import { DataTypes } from "sequelize";
import { sequelize } from "../DBConfig/connection.js";
import ProductModel from "./ProductModel.js";

const OrderItemModel = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_id",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    timestamps: false,
    underscored: true,
  }
);

OrderItemModel.belongsTo(ProductModel, {
  foreignKey: "productId",
  as: "product",
});

export default OrderItemModel;
