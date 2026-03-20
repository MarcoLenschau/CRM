import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true,
        maxlength: 50
    },
    subject: {
        type: String,
        required: false,
        maxlength: 100
    }
}, {timestamps: true, versionKey: false});

export default mongoose.models.Email || mongoose.model("Email", emailSchema);