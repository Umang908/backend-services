const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product title is required'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Price cannot be negative'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product description is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product category is required'
        }
      },
      set(value) {
        this.setDataValue('category', value.toLowerCase().trim());
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product image is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      validate: {
        min: {
          args: [0],
          msg: 'Stock cannot be negative'
        }
      }
    },
    rating_rate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Rating cannot be negative'
        },
        max: {
          args: [5],
          msg: 'Rating cannot exceed 5'
        }
      }
    },
    rating_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Rating count cannot be negative'
        }
      }
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    tableName: 'products'
  }
);

// Define association
Product.belongsTo(Category, {
  foreignKey: {
    name: 'categoryId',
    allowNull: true
  },
  as: 'categoryDetails'
});

// Instance method to get rating as an object
Product.prototype.getRating = function() {
  return {
    rate: this.rating_rate,
    count: this.rating_count
  };
};

module.exports = Product; 