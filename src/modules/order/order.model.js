const path = require("path");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));
const { DataTypes } = require('sequelize');
const Customer = require(path.join(process.cwd(), "src/modules/customer/customer.model"));
const Dish = require(path.join(process.cwd(), "src/modules/dish/dish.model"));

const Order = sequelize.define('orders', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    customer_id:{
        allowNull: false,
        type: DataTypes.UUID
    },
    dish_id:{
        allowNull: false,
        type: DataTypes.UUID
    },
    shop_id:{
        allowNull: false,
        type: DataTypes.UUID
    },
    quantity:{
        allowNull: false,
        type: DataTypes.INTEGER
    }
});

Customer.hasMany(Order, { as: 'orders', foreignKey: 'customer_id' });
Order.belongsTo(Customer, { as: 'customer', foreignKey: 'customer_id' });

Order.hasMany(Dish, { as: 'dishes', foreignKey: 'dish_id' });
Dish.belongsTo(Order, { as: 'orders', foreignKey: 'dish_id' });

module.exports = Order;