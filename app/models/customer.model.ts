/**
 * Mongoose schema for Customer documents in MongoDB.
 * Defines customer account structure with contact info, company, status, and assignment tracking.
 *
 * @typedef {Object} Customer
 * @property {string} name - Customer's display name (max 50 characters, required)
 * @property {string} email - Customer's email address (required)
 * @property {string} phone - Customer's phone number (max 20 characters, optional)
 * @property {string} company - Customer's company name (optional)
 * @property {string} status - Customer account status (active, inactive, pending - defaults to active)
 * @property {string} assignedUserId - ID of assigned account manager (required)
 * @property {Date} createdAt - Automatic creation timestamp
 * @property {Date} updatedAt - Automatic update timestamp
 * @category MongoDB Models
 * @security Status field restricted to enum values to prevent invalid states
 * @performance Indexed on assignedUserId for fast user-customer queries
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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