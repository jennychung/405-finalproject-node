const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');


module.exports = sequelize.define('product', {
  id: {
    field: 'productId',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    field: 'productName',
    type: Sequelize.STRING,
    validate: {
          notEmpty: {
            args: true,
            msg: 'Name is required'
          }
        }
  },
  brand: {
    field: 'brand',
    type: Sequelize.STRING,
    validate: {
          notEmpty: {
            args: true,
            msg: 'Brand is required'
          }
        }
  },
  category: {
    field: 'productType',
    type: Sequelize.STRING,
    validate: {
          notEmpty: {
            args: true,
            msg: 'Category is required'
          }
        }
  },
  imageLink: {
    field: 'imageLink',
    type: Sequelize.STRING,
    validate: {
          notEmpty: {
            args: true,
            msg: 'Image is required'
          }
        }
  }
}, {
  timestamps: false
});

//brand productName productType productTypeSimple ingredients volume pH directLink imageLink
