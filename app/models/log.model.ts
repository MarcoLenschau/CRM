/**
 * Mongoose schema for audit Log documents in MongoDB.
 * Tracks all system actions for compliance, debugging, and user activity monitoring.
 *
 * @typedef {Object} Log
 * @property {string} userID - ID of user who performed the action (max 50 characters, required)
 * @property {string} action - Type of action performed (e.g., CREATE, UPDATE, DELETE - required)
 * @property {string} entity - Entity affected by the action (e.g., customer, event, user - required)
 * @property {string} status - Action result status (SUCCESS, FAILED, WARNING - required)
 * @property {string} description - Detailed description of action and results (optional)
 * @property {Date} createdAt - Automatic creation timestamp
 * @property {Date} updatedAt - Automatic update timestamp
 * @category MongoDB Models
 * @security Status restricted to enum values; logs are immutable after creation; userID required for audit trail
 * @performance Indexed on userID and action for fast audit trail filtering
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
import mongoose from "mongoose";
import { LogStatus } from "../enums/status.enum";

const logSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        maxlength: 50
    },
    action: {
        type: String,
        required: true
    },
    entity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: LogStatus,
        required: true
    },
    description: {
        type: String,
    },
}, {timestamps: true, versionKey: false});

export default mongoose.models.Log || mongoose.model("Log", logSchema);