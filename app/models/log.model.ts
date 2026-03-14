import mongoose from "mongoose";

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
        required: true
    },
    description: {
        type: String,
    },
}, {timestamps: true});

export default mongoose.models.Log || mongoose.model("Log", logSchema);