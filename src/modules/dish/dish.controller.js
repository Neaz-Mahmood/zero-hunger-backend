const path = require("path");
const Dish = require(path.join(process.cwd(), "src/modules/dish/dish.model"));


async function getDishes(req, res) {
    try {
        const shop_id = req.params.shop_id;
        

        const data = await Dish.findAll({
            where:{
                shop_id
            }
            
        });

        if(!data) res.status(404).send("dishes not found");

        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error.");
    }
};

async function createDish(req, res) {
    try {
        const shop_id = req.params.shop_id;
        const { name, category_id, price, description } = req.body;

        const [data, created] = await Dish.findOrCreate({
            where: { shop_id , name},
            defaults: {
                name,
                shop_id,
                category_id, 
                price, 
                description
            }
        });

        if (!created) return res.status(400).send("Dish already exists.");

        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error.");
    }
};




module.exports.getDishes = getDishes;
module.exports.createDish= createDish;

