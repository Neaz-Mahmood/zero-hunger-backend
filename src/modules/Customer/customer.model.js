const path = require("path");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));
const { DataTypes } = require("sequelize");
const bcrypt = require('bcryptjs');

const Customer = sequelize.define("customers", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue("password", bcrypt.hashSync(value, 8));
        }
    },
    phone_number: {
        allowNull: false, 
        type: DataTypes.STRING(20)
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING(255)
    },
    pin_code: {
        allowNull: false,
        type: DataTypes.STRING(10)
    }
});

Customer.prototype.validPassword = function(password) { 
    return bcrypt.compareSync(password, this.password);

}

// CustomerType.hasMany(Customer, { as: "customers", foreignKey: "customer_type_id" });
//Customer.belongsTo(CustomerType, { as: "customer_type", foreignKey: "customer_type_id" });

module.exports = Customer;
