require('dotenv').config();
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const customerRouter = require(path.join(process.cwd(),"src/modules/customer/customer.routes.js"));
const shopRouter = require(path.join(process.cwd(),"src/modules/shop/shop.routes.js"));
const categoryRouter = require(path.join(process.cwd(),"src/modules/category/category.routes.js"));
const orderRouter = require(path.join(process.cwd(),"src/modules/order/order.routes.js"));
const dishRouter = require(path.join(process.cwd(),"src/modules/dish/dish.routes.js"));
const customerStrategy = require(path.join(process.cwd(),"src/modules/customer/customer.strategy.js"));
const shopStrategy = require(path.join(process.cwd(),"src/modules/shop/shop.strategy.js"));


const express = require("express");

module.exports = async function () {
    const app = express();

    app.use(cors());
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(express.json());

    customerRouter(app);
    shopRouter(app);
    categoryRouter(app);
    dishRouter(app);
    orderRouter(app)
    customerStrategy();
    shopStrategy(); 

    app.get("/", (req, res) => {
        res.send("The server is running...");
    });

    return app;
};
