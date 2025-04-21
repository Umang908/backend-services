const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Category = sequelize.define('Category', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Category name is required'
        }
      },
      set(value) {
        this.setDataValue('name', value.toLowerCase().trim());
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: '📦'
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: 'bg-gray-100 text-gray-800'
    }
  },
  {
    timestamps: true,
    tableName: 'categories'
  }
);

module.exports = Category; 