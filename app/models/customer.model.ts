import mongoose from "mongoose";
import { CustomerStatus } from "@/app/enums/status.enum";

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
        enum: Object.values(CustomerStatus),
        default: CustomerStatus.ACTIVE,
        required: true
    },
    assignedUserId: {
        type: String,
        required: true
    },
}, {timestamps: true, versionKey: false});

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);