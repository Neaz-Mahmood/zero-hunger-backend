const path = require("path");
const controller = require("./category.controllers");
const { categorySchema } = require("./category.schema");
const validate = require(path.join(process.cwd(), "src/config/middleware/validate"));

module.exports = (app) => {
    app.route('/api/categories')
        .get(controller.getCategories)
        .post(validate(categorySchema), controller.createCategory);

    app.route('/api/categories/:id')
        .get(controller.getCategory)
        .put( validate(categorySchema), controller.updateCategory)
        .delete( controller.deleteCategory);

}