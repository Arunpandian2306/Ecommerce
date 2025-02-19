import { DataTypes } from "sequelize";
import { sequelize } from "../DBConfig/connection.js";
import OrderItemModel from "./OrderItemModel.js";
import UserModel from "./UserModel.js";

const OrderModel = sequelize.define(
  "Order",
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
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "total_price",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

OrderModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
OrderModel.hasMany(OrderItemModel, { foreignKey: "orderId", as: "items" });

export default OrderModel;
