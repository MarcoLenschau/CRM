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