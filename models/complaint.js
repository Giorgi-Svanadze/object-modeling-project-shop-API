const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    complaintId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
});

ComplaintSchema.methods.resolveComplaint = function () {
    this.status = "Resolved";
    return this.save();
};

const Complaint = mongoose.model("Complaint", ComplaintSchema);
module.exports = Complaint;
