/**
 * Mongoose schema for Event documents in MongoDB.
 * Defines calendar event structure with priority levels and user assignment.
 *
 * @typedef {Object} Event
 * @property {string} userID - ID of user who created/owns the event (required)
 * @property {string} name - Event name/title (max 50 characters, required)
 * @property {string} description - Detailed event description (optional)
 * @property {string} prio - Event priority level (HIGH, MEDIUM, LOW - required)
 * @property {Date} createdAt - Automatic creation timestamp
 * @property {Date} updatedAt - Automatic update timestamp
 * @category MongoDB Models
 * @security Priority restricted to enum values; userID required to track ownership
 * @performance Indexed on userID for fast event retrieval by owner
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
import mongoose from "mongoose";
import { Prio } from "../enums/prio.enum";

const eventSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: false
    }, 
    prio: {
        type: String,
        enum: Object.values(Prio),
        required: true
    }
}, {timestamps: true, versionKey: false});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);