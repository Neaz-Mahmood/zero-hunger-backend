const path = require("path");
const controller = require("./order.controller");

module.exports = (app) => {
    app.route("/api/shops/:shop_id/orders")
        .get(controller.getOrders)

    app.route("/api/customer/order")
        .post(controller.createOrder);


};  