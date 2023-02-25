const path = require("path");
const controller = require('./customer.controller');
const validate = require(path.join(process.cwd(), "src/config/middleware/validate"));
const { customerRegisterSchema, customerUpdateSchema } = require('./customer.schema');
//const auth = require('./customer-authentication.middleware');
const { AuthStrategy } = require('./customer.auth.middleware');

module.exports = app => {
    app.route("/api/customers")
        .get(controller.getCustomers)
        .post(validate(customerRegisterSchema), controller.createCustomer);

    app.get('/api/customers/logout', AuthStrategy, controller.logout);

    app.route("/api/customers/:id")
        .get(AuthStrategy, controller.getCustomer)
        .put(AuthStrategy, validate(customerUpdateSchema), controller.putCustomer)
        .patch(AuthStrategy, controller.patchCustomer)
        .delete(controller.deleteCustomer);

    app.route("/api/customers/login")
        .post(controller.login);
}
