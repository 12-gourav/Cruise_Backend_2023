import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    star:{
        type: Number,
        required: true
    },
    cruiseSlug:{
        type: String,
        required: true
    },
    imageLink:{
        type: String,
        required: true
    },
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default Review;