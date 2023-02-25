const path = require("path");
const Order = require(path.join(process.cwd(), "src/modules/order/order.model"));

const getOrders = async (req, res) => { 
    try {
        const shop_id = req.params.shop_id;
        
        const orders = await Order.findAll({
            where: {
                shop_id
            }
        });

        if(!orders) res.status(404).send("Orders not found");

        res.status(200).send(orders);
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error!");
    } 
};


const createOrder = async (req, res) => {
    try {
        const { customer_id, dish_id, shop_id, quantity } = req.body;

        const [order, created] = await Order.findOrCreate({
            where: { 
                shop_id,
                customer_id,
                dish_id
            },
            defaults: {
                customer_id,
                dish_id, 
                shop_id, 
                quantity
             },
        });

        if (!created) return res.status(400).send("Already ordered this item.");

        res.status(201).send(order);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }

};

const updateOrder = async (req, res) => {
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            where: {
                id,
            },
        });

        if (!order) return res.status(404).send("Order not found!");

        await order.destroy();

        res.status(200).send(order);

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    } 
};

module.exports.getOrders = getOrders;
module.exports.createOrder = createOrder;
