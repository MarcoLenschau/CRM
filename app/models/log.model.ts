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