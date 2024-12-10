const Complaint = require("../models/complaint");

const ComplaintController = {
    async createComplaint(req, res) {
        try {
            const complaint = new Complaint(req.body);
            await complaint.save();
            res.status(201).json(complaint);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllComplaints(req, res) {
        try {
            const complaints = await Complaint.find();
            res.status(200).json(complaints);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getComplaintById(req, res) {
        try {
            const complaint = await Complaint.findById(req.params.id);
            if (!complaint) {
                return res.status(404).json({ message: "Complaint not found" });
            }
            res.status(200).json(complaint);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateComplaint(req, res) {
        try {
            const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!complaint) {
                return res.status(404).json({ message: "Complaint not found" });
            }
            res.status(200).json(complaint);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteComplaint(req, res) {
        try {
            const complaint = await Complaint.findByIdAndDelete(req.params.id);
            if (!complaint) {
                return res.status(404).json({ message: "Complaint not found" });
            }
            res.status(200).json({ message: "Complaint deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async resolveComplaint(req, res) {
        try {
            const complaint = await Complaint.findById(req.params.id);
            if (!complaint) {
                return res.status(404).json({ message: "Complaint not found" });
            }
            await complaint.resolveComplaint();
            res.status(200).json({ message: "Complaint resolved successfully", complaint });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ComplaintController;
