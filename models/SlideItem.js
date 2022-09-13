import mongoose from "mongoose";

const SlideItemSchema = new mongoose.Schema(
    {
        imageUrl: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('SlideItem', SlideItemSchema)