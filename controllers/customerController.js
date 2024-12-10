const Customer = require("../models/customer");

const CustomerController = {
    async createCustomer(req, res) {
        try {
            const customer = new Customer(req.body);
            await customer.save();
            res.status(201).json(customer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllCustomers(req, res) {
        try {
            const customers = await Customer.find().populate(["loyaltyCard", "orders"]);
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCustomerById(req, res) {
        try {
            const customer = await Customer.findById(req.params.id).populate(["loyaltyCard", "orders"]);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCustomer(req, res) {
        try {
            const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            res.status(200).json(customer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteCustomer(req, res) {
        try {
            const customer = await Customer.findByIdAndDelete(req.params.id);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            res.status(200).json({ message: "Customer deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addOrder(req, res) {
        try {
            const { customerId, orderDetails } = req.body;
    
            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }

            const updatedCustomer = await customer.addOrder(orderDetails);
    
            return res.status(201).json(updatedCustomer);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error adding order" });
        }
    },

    async fileComplaint(req, res) {
        try {
            const { customerId, orderId, complaintDetails } = req.body;

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }

            const updatedCustomer = await customer.fileComplaint(orderId, complaintDetails);

            return res.status(201).json(updatedCustomer);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error filing complaint" });
        }
    }
};

module.exports = CustomerController;
