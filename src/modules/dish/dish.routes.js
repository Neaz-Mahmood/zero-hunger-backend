const path = require("path");
const { AuthStrategy } = require("../shop/shop-authentication.middleware");
const controller = require("./dish.controller");
const validate = require(path.join(process.cwd(), "src/config/middleware/validate"));
const { dishUploadSchema, dishUpdateSchema } = require("./dish.schema");

module.exports = (app) => {
    app.route("/api/dishes/:shop_id")
        .get(controller.getDishes)
        .post(validate(dishUploadSchema), controller.createDish);

};
