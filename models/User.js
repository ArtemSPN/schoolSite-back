import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        log:{
            type: String,
            default: "admin",
        },
        pas:{
            type: String,
            required: true,
        },
        
    },
);

export default mongoose.model('User', UserSchema)


