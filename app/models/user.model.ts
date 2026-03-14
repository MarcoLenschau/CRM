import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

export default mongoose.models.User || mongoose.model("User", userSchema);