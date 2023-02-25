const Customer = require('./customer.model');
const { generateAccessToken } = require('./services/customer.service');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({
            where: {
                email
            }
        });

        if(!customer || !customer.validPassword(password)) return res.status(400).send('Invalid email or password.');

        res.cookie("access_token", generateAccessToken(customer), { 
            httpOnly: true, 
            sameSite: true, 
            signed: true 
        });


        return res.status(200).send(customer);
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
}

async function logout(req, res) {
    res.clearCookie("access_token");
    res.send('Logged out.');
}



async function getCustomer(req, res) {
    try {
        const { id } = req.params;

        const customer = await Customer.findOne({
            where: {
                id
            }
        });

        if (!customer) return res.status(404).send('Customer not found!');

        res.status(200).send(customer);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
}

async function getCustomers(req, res) {
    try {
        const customers = await Customer.findAll();

        if (!customers) return res.status(404).send('Customers not found!');

        res.status(200).send(customers);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
}

async function createCustomer(req, res) {
    try {
        const { name, email, password, phone_number, address, pin_code } = req.body;

        const existCustomer = await Customer.findOne({
            where: {
                email:email.toLowerCase()
            }
        });

        if (existCustomer) return res.status(400).send('Already registered with this email address.');

        const customer = await Customer.create({
            name,
            email: email.toLowerCase(),
            password,
            phone_number,
            address, 
            pin_code
        });

        res.status(201).send(customer);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!');
    }
}

async function putCustomer(req, res) {
    try {
        const { id } = req.params;
        const { name, email, phone_number, address, pin_code } = req.body;

        const customer = await Customer.update({
            name,
            email,
            phone_number,
            address,
            pin_code
        }, {
            where: {
                id
            }
        });

        if (!customer) return res.status(404).send('Customer not found!');

        res.status(201).send(customer);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!');
    }
}

async function patchCustomer(req, res) {
    try {
        const { id } = req.params;
        const { name, email, phone_number, address, pin_code } = req.body;

        const customer = await Customer.findOne({
            where: {
                id
            }
        });

        if (!customer) return res.status(404).send('Customer not found!');

        if (name) customer.update({ name: name });
        if (email) customer.update({ email: email });
        if (phone_number) customer.update({ phone_number: phone_number });
        if (address) customer.update({ address: address });
        if (pin_code) customer.update({ pin_code: pin_code });

        res.status(201).send(customer);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!');
    }
}

async function deleteCustomer(req, res) {
    try {
        const { id } = req.params;

        const customer = await Customer.findOne({
            where: {
                id
            }
        });

        if (!customer) return res.status(404).send('Customer not found!');

        await customer.destroy();

        res.sendStatus(200).send(customer);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!');
    }


}

module.exports.getCustomer = getCustomer;
module.exports.getCustomers = getCustomers;
module.exports.createCustomer = createCustomer;
module.exports.putCustomer = putCustomer;
module.exports.patchCustomer = patchCustomer;
module.exports.deleteCustomer = deleteCustomer;
module.exports.login = login;
module.exports.logout = logout;