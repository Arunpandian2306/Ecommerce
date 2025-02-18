import { DataTypes } from 'sequelize';
import { sequelize } from '../DBConfig/connection.js'; // Adjust the import path as needed

const CategoryModel = sequelize.define('Category', {
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
}, {
  tableName: 'categories', // Optional: Define the table name explicitly
  timestamps: true, // Optional: Enable createdAt and updatedAt fields
});

export default CategoryModel;
