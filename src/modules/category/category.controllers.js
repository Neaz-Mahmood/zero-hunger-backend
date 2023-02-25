const Category = require("./category.model");



async function getCategories(req, res) {
    try {
        const categories = await Category.findAll();

        res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function createCategory(req, res) {
    try {
        const { category } = req.body;

        const existCategory = await Category.findOne({
            where: {
                name: category
            }
        });
        if (existCategory) return res.status(400).send('Duplicate category.');

        const newCategory = await Category.create({
            name: category
        });

        res.status(201).send(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function getCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findOne({
            where: {
                id
            }
        });
        if (!category) return res.status(404).send('Category not found.');

        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { category } = req.body;

        const existCategory = await Category.findOne({
            where: {
                id
            }
        });
        if (!existCategory) return res.status(404).send('Category not found.');

        await existCategory.update({
            name: category
        });

        res.status(201).send(existCategory);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findOne({
            where: {
                id
            }
        });
        if (!category) return res.status(404).send('Category not found.');

        await category.destroy();

        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}





module.exports.getCategories = getCategories;
module.exports.createCategory = createCategory;
module.exports.getCategory = getCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;

