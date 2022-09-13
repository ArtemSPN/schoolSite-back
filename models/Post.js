import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true,
        },
        text:{
            type: String,
            required: true,
        },
        viewCount:{
            type: Number,
            default: 0,
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Post', PostSchema)