/**
 * Mongoose schema for User documents in MongoDB.
 * Defines user account structure with authentication credentials and admin status.
 *
 * @typedef {Object} User
 * @property {string} name - User's display name (max 50 characters, required)
 * @property {string} email - User's email address (unique, required)
 * @property {string} hash - Hashed password (required)
 * @property {boolean} isAdmin - Admin privilege flag (required)
 * @property {Date} createdAt - Automatic creation timestamp
 * @property {Date} updatedAt - Automatic update timestamp
 * @category MongoDB Models
 * @security Hash stored as bcrypt for password security; email is unique indexed for account recovery
 * @performance Indexed on email for fast lookups during authentication
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, {timestamps: true, versionKey: false});

export default mongoose.models.User || mongoose.model("User", userSchema);