import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        maxlength: 20
    },
    company: {
        type: String,
    },
    status: {
        type: String,
    },
    assignedUserId: {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);